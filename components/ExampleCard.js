export default function ExampleCard(ex) {
  const { title, description, slug, theme } = ex;

  return (
    <a
      href={`/examples/${slug}`}
      style={{
        ["--background"]: `url(/assets/thumbnails/${slug}.png)`,
        ["--font-color"]: `${theme === "dark" ? "#fff" : "#000"}`,
      }}
      className="example-card"
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
}
