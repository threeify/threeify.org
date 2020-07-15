import Head from "next/head";
import ExampleGrid from "../../components/ExampleGrid";
import Layout from "../../components/Layout";
import TopNavbar from "../../components/TopNavbar";
import { getExamples } from "../../lib/api";

export default function Home(props) {
  return (
    <Layout>
      <Head>
        <title>Threeify Examples</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Threeify Examples" />
        <meta name="keywords" content="threeify,3D,typescript,javascript" />
      </Head>
      <TopNavbar />
      <h1 className="title">Threeify Examples</h1>
      <ExampleGrid examples={props.examples} />
    </Layout>
  );
}

export async function getStaticProps() {
  const examples = await getExamples();

  return {
    props: { examples },
  };
}
