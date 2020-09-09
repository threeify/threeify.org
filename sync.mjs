import { exec } from "child_process";
import program from "commander";
import fs from "fs";
import glob from "glob";
import makeDir from "make-dir";
import path from "path";
import process from "process";
import puppeteer from "puppeteer";

program
  .name("build")
  .option("-i, --inDir <dirpath>", "the root of the input directory tree")
  .option("-o, --outDir <dirpath>", "the root of the output directory tree")
  .option("-m, --minify", "minify the code")
  .option("-c, --compress", "compress the code using brotli")
  .option("-s, --screenshot", "re-generate the screenshots")
  .option(
    "-v, --verboseLevel <level>",
    "higher numbers means more output",
    parseInt
  );
program.parse(process.argv);

const rootDir = path.join(program.inDir, "./dist");
const sourceDir = path.join(program.inDir, "./src");
const assetDir = path.join(program.inDir, "./assets");

function log(verbosity, text) {
  //if (verbosity >= program.verboseLevel) {
  console.log(text);
  //}
}

async function asyncCommandLine(commandLine) {
  return new Promise(function (resolve, reject) {
    exec(commandLine, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
}
async function bundle(inputFilePath, outputFilePath) {
  return asyncCommandLine(
    `yarn rollup ${inputFilePath} --file ${outputFilePath} --format iife --minifyInternalExport`
  );
}

async function minify(inputFilePath, outputFilePath) {
  return asyncCommandLine(
    `yarn terser --compress --mangle --mangle-props -- ${inputFilePath} --output ${outputFilePath}`
  );
}

async function compress(inputFilePath) {
  return asyncCommandLine(`brotli ${inputFilePath}`);
}

async function transpile() {
  return asyncCommandLine(
    `yarn tgt -p ${program.inDir} ${program.minify ? "--minify" : ""}`
  );
}

function fileSize(filePath) {
  return fs.statSync(filePath).size;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  await transpile();

  const distJSGlob = `${rootDir}/**/index.js`;
  glob(distJSGlob, {}, async function (er, inputFileNames) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    for (let i = 0; i < inputFileNames.length; i++) {
      let inputFileName = inputFileNames[i];
      try {
        const inputDirectory = path.dirname(inputFileName);
        const outputDirectory = inputDirectory.replace(rootDir, program.outDir);
        const sourceDirectory = inputDirectory.replace(rootDir, sourceDir);

        const name = inputDirectory
          .replace(rootDir, "")
          .replace("/examples/", "");

        const extension = path.extname(inputFileName);
        const baseName = path.basename(inputFileName, extension);
        const bundledFileName = `${outputDirectory}/${baseName}.rollup${extension}`;
        const minifiedFileName = `${outputDirectory}/${baseName}${extension}`;

        //const outputFileName = `${outputDirectory}/${sourceBaseName}.${sourceExtension}`;
        if (!fs.existsSync(outputDirectory)) {
          log(1, `making output directory: ${outputDirectory}`);
          makeDir.sync(outputDirectory);
        }
        log(1, `bundling: ${inputFileName} -> ${bundledFileName}`);
        await bundle(inputFileName, bundledFileName);
        const bundledFileSize = fileSize(bundledFileName);
        inputFileName = bundledFileName;
        let minifiedFileSize = undefined;
        if (program.minify) {
          log(1, `minifying: ${inputFileName} -> ${minifiedFileName}`);
          await minify(inputFileName, minifiedFileName);
          fs.unlinkSync(inputFileName);
          inputFileName = minifiedFileName;
          minifiedFileSize = fileSize(minifiedFileName);
        } else {
          log(1, `renaming: ${inputFileName} -> ${minifiedFileName}`);
          fs.renameSync(inputFileName, minifiedFileName);
        }

        const compressedFileName = inputFileName + ".br";
        if (fs.existsSync(compressedFileName)) {
          log(1, `removing existing brotli file: ${compressedFileName}`);
          fs.unlinkSync(compressedFileName);
        }
        let compressedFileSize = undefined;
        if (program.compress) {
          log(1, `brotli compressing: ${inputFileName}`);
          await compress(inputFileName);
          compressedFileSize = fileSize(inputFileName + ".br");
        }

        const sourceJson = "./" + path.join(sourceDirectory, "example.json");
        if (fs.existsSync(sourceJson)) {
          log(1, `reading example json: ${sourceJson}`);
          const outputJson = path.join("./" + outputDirectory, "example.json");
          const json = JSON.parse(fs.readFileSync(sourceJson));
          json.githubUrl =
            inputDirectory.replace(
              rootDir,
              "https://github.com/threeify/threeify/blob/master/src/"
            ) + "/index.ts";
          json.bundleSize = bundledFileSize;
          if (minifiedFileSize !== undefined) {
            json.minifiedSize = minifiedFileSize;
          }
          if (compressedFileSize) {
            json.compressedFileSize = compressedFileSize;
          }
          log(1, `writing example json: ${outputJson}`);
          fs.writeFileSync(outputJson, JSON.stringify(json));

          if (program.screenshot) {
            log(1, `taking screenshot of example: ${name}`);
            if (json.thumbnail !== "manual") {
              const examplePageUrl = `http://localhost:8000/examples?name=${name}`;
              log(1, `going to example page: ${examplePageUrl}`);
              await page.goto(examplePageUrl);

              log(1, `waiting for canvas to be created`);
              let canvas = null;
              while (canvas === null) {
                canvas = await page.$("canvas");
                await sleep(200);
              }

              log(1, `found canvas`);
              await sleep(500);

              const screenshotPath = `${program.outDir}/assets/thumbnails/${json.slug}.png`;
              const screenshotDir = path.dirname(screenshotPath);
              if (!fs.existsSync(screenshotDir)) {
                log(1, `taking directory for screenshot: ${screenshotDir}`);
                makeDir.sync(screenshotDir);
              }
              log(1, `taking screenshot: ${screenshotPath}`);
              await canvas.screenshot({ path: screenshotPath });
            }
          }
        }
      } catch (e) {
        console.log(" ERROR ", e);
      }
    }
    await browser.close();
  });

  const brotliExtensions = ["obj", "hdr", "mtl", "ply", "glTF", "glb", "hdr"];
  const assetsGlob = `${assetDir}/**/*.*`;
  glob(assetsGlob, {}, function (er, inputFileNames) {
    inputFileNames.forEach(async (inputFileName) => {
      const inputDirectory = path.dirname(inputFileName);
      const outputDirectory = inputDirectory.replace(
        assetDir,
        program.outDir + "/assets"
      );

      const extension = path.extname(inputFileName);
      const baseName = path.basename(inputFileName, extension);
      const outputFileName = `${outputDirectory}/${baseName}${extension}`;

      if (!fs.existsSync(outputDirectory)) {
        log(1, `creating output directory: ${outputDirectory}`);
        makeDir.sync(outputDirectory);
      }
      if (fs.existsSync(outputFileName)) {
        log(1, `removing existing output file: ${outputFileName}`);
        fs.unlinkSync(outputFileName);
      }
      log(1, `copying output file: ${outputFileName}`);
      fs.copyFileSync(inputFileName, outputFileName);

      if (brotliExtensions.indexOf(extension.slice(1)) >= 0) {
        const compressedFileName = outputFileName + ".br";
        if (fs.existsSync(compressedFileName)) {
          log(1, `removing existing brotli file: ${compressedFileName}`);
          fs.unlinkSync(compressedFileName);
        }
        if (program.compress) {
          log(1, `creating brotli output: ${compressedFileName}`);
          await compress(outputFileName);
          log(1, `brotli created!`);
        }
      } else {
        log(1, `skipping brotli output creation, (${extension}) not supported`);
      }
    });
  });
}

main();
