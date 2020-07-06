import Link from "next/link";

export default function ExampleCard({ title, description, slug }) {
  return (
    <div className="example-card">
      <a href={`/examples/${slug}`}>
        <h3>{title}</h3>
      <p>{description}</p>
      <img src={`/assets/thumbnails/${slug}.png`} width="240"></img>
      </a>
    </div>
  );
}
