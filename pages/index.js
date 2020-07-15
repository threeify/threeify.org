import Head from "next/head";
import ExampleGrid from "../components/ExampleGrid";
import Layout from "../components/Layout";
import TopNavbar from "../components/TopNavbar";
import { getExamples } from "../lib/api";

export default function Home(props) {
  return (
    <Layout>
      <Head>
        <title>Threeify - A Modern and Fast 3D Typescript Library</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A Modern and Fast 3D Typescript Library"
        />
        <meta name="keywords" content="threeify,3D,typescript,javascript" />
      </Head>
      <TopNavbar />
      <h1 className="title">Introducing Threeify!</h1>
      <p className="description">
        Threeify is a modern and fast 3D Typescript library.
            </p>
      <h2 className="description">Examples</h2>
      <ExampleGrid examples={props.examples} />
      <a href="https://github.com/threeify/threeify" target="_blank">
        Threeify on Github
            </a>
    </Layout>
  );
}

export async function getStaticProps() {
  const examples = await getExamples();

  return {
    props: { examples },
  };
}
