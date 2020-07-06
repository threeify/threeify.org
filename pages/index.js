import Head from "next/head";
import { getExamples } from "../lib/api";
import ExampleGrid from "../components/ExampleGrid";

export default function Home(props) {
  return (
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
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const examples = await getExamples();

  return {
    props: { examples },
  };
}
