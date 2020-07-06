import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { getExampleBySlug, getExamples } from '../../lib/api'

export default function Example({ example }) {
  const router = useRouter()
  if (!router.isFallback && !example?.slug) {
    return <ErrorPage statusCode={404} />
  }
  console.log( "example", example );
  const indexJs = `/${example.directory}/index.js`;
  return (
    <div className="container">
      <Head>
        <title>{example.title} - Threeify</title>
        <link rel="icon" href="/favicon.ico" />
        <script type="module" src={indexJs}></script>
     </Head>

      <main>
        <h1>
          {example.title}
        </h1>
        <p className="description">
          {example.description}
        </p>
        <p className="code">
          bundle: {example.bundleSize}, minified: {example.minifiedSize}, brotli: {example.compressedFileSize}, 
        </p>
        <canvas id="threeify-framebuffer"/>
      </main>

      <footer>
        <a
          href="https:/github.com/threeify/threeify"
          target="_blank"
          rel="noopener noreferrer"
        >
          Threeify on Github
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps({ params }) {
    console.log( 'params', params);
  const example = await getExampleBySlug(params.slug)
  
  return {
    props: {
        example
    },
  }
}

export async function getStaticPaths() {
  const examples = await getExamples()

  return {
    paths: examples.map((examples) => {
      return {
        params: {
          slug: examples.slug,
        },
      }
    }),
    fallback: false,
  }
}