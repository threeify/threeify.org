import fs from "fs";
import { join } from "path";
import glob from "glob";
import path from "path";

const examplesDirectory = join(process.cwd(), "/public/examples");
const globSearch = examplesDirectory + `/**/example.json`;
let examples = undefined;

export async function getExamples() {
  return new Promise(function (resolve, reject) {
    if (examples !== undefined) return resolve(examples);
    glob(globSearch, {}, function (err, exampleJsonFileNames) {
      const localExamples = [];
      exampleJsonFileNames.forEach((exampleFileName) => {
        const exampleJson = JSON.parse(fs.readFileSync(exampleFileName));
        const example = {
          slug: exampleJson.slug,
          title: exampleJson.en.name,
          description: exampleJson.en.description,
          keywords: exampleJson.en.keywords,
          bundleSize: exampleJson.bundleSize,
          minifiedSize: exampleJson.minifiedSize,
          compressedSize: exampleJson.compressedFileSize,
          keywords: exampleJson.en.keywords,
          directory: path.relative(
            process.cwd() + "/public",
            path.dirname(exampleFileName)
          ),
        };
        localExamples.push(example);
      });
      examples = localExamples;
      resolve(examples);
    });
  });
}

export async function getExampleBySlug(slug, fields = []) {
  // filter by fields.
  const examples = await getExamples();
  return examples.find((example) => example.slug === slug);
}
