export default function ExampleCard(ex) {
  const { title, description, slug } = ex;

  return (
    <a
      href={`/examples/${slug}`}
      style={{ ["--background"]: `url(/assets/thumbnails/${slug}.png)` }}
      className="example-card"
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
}
