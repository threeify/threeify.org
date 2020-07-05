import Link from 'next/link'

export default function ExampleCard({
  title,
  description,
  slug
}) {
  return (
    <section>
      <Link as={`/examples/${slug}`} href="/examples/${slug}">
      <h3>{title}</h3>
      </Link>
      <p>{description}</p>
    </section>
  )
}