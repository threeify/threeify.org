import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import TopNavbar from "../../components/TopNavbar";
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
    <Layout>
      <Head>
        <title>{example.title} - Threeify</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={example.description} />
        <meta
          name="keywords"
          content={example.keywords
            .concat(["3D", "typescript", "javascript", "example"])
            .join(",")}
        />
      </Head>
      <TopNavbar />
      <h1 className="example-title">{example.title}</h1>
      <p className="example-description">{example.description}</p>
      <p className="example-p">
        <a href={example.githubUrl} target="_blank">
          Source Code on Github
        </a>
      </p>
      <p className="example-p">
        bundle: {formatBytes(example.bundleSize)}, minified:{" "}
        {formatBytes(example.minifiedSize)}, brotli:{" "}
        {formatBytes(example.compressedSize)}
      </p>
      <div className="description" id="text"></div>
      <canvas id="framebuffer" width={800} height={800} />
      <script async type="module" src={indexJs}></script>
    </Layout>
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
