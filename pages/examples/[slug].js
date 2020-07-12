import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { getExampleBySlug, getExamples } from "../../lib/api";

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default function Example({ example }) {
  const router = useRouter();
  if (!router.isFallback && !example?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const indexJs = `/${example.directory}/index.js`;

  return (
    <div>
      <Head>
        <title>{example.title} - Threeify</title>
        <link rel="icon" href="/favicon.ico" />
        <script type="module" src={indexJs}></script>
        <meta name="description" content={example.description} />
        <meta
          name="keywords"
          content={example.keywords
            .concat(["3D", "typescript", "javascript", "example"])
            .join(",")}
        />
      </Head>
      <p className="code">
        <a href="/">Threeify Home</a>
      </p>
      <h1>{example.title}</h1>
      <p className="description">{example.description}</p>
      <p className="code">
        <a href={example.githubUrl}>Source</a>
      </p>
      <canvas
        className="code"
        id="threeify-framebuffer"
        width="800px"
        height="800px"
      />
      <p className="code">
        bundle: {formatBytes(example.bundleSize)}
        <br />
        minified: {formatBytes(example.minifiedSize)}
        <br />
        brotli: {formatBytes(example.compressedSize)}
      </p>
      <p>
        <a href="https://github.com/threeify/threeify" target="_blank">
          Threeify on Github
        </a>
      </p>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const example = await getExampleBySlug(params.slug);

  return {
    props: {
      example,
    },
  };
}

export async function getStaticPaths() {
  const examples = await getExamples();

  return {
    paths: examples.map((examples) => {
      return {
        params: {
          slug: examples.slug,
        },
      };
    }),
    fallback: false,
  };
}
