import Card from "react-bootstrap/Card";

export default function ExampleCard(ex) {
  const { title, description, slug, theme } = ex;

  const imageUrl = `/assets/thumbnails/${slug}.png`;
  const exampleUrl = `/examples/${slug}`;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageUrl} width="300px" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Link href={exampleUrl}>Try example...</Card.Link>
      </Card.Body>
    </Card>
  );
}
