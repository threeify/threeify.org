import Head from "next/head";
import { getExamples } from "../lib/api";
import ExampleGrid from "../components/ExampleGrid";
import Layout from "../components/Layout";

export default function Home(props) {
  return (
    <Layout>
      <div className="container">
        <Head>
          <title>Threeify - A Modern and Fast 3D Typescript Library</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">Introducing Threeify!</h1>

          <p className="description">
            Threeify is a modern and fast 3D Typescript library.
          </p>

          <h2 className="examples">Examples</h2>
          <div className="grid">
            <ExampleGrid examples={props.examples} />
          </div>
        </main>

        <footer>
          <a href="https:/github.com/threeify/threeify" target="_blank">
            Threeify on Github
          </a>
        </footer>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const examples = await getExamples();

  return {
    props: { examples },
  };
}
