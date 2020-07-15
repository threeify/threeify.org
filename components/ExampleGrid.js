import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ExampleCard from "./ExampleCard";
export default function ExampleGrid(props) {
  let example1 = props.examples[0];

  const exampleCards = props.examples.map((example) => (
    <ExampleCard
      title={example.title}
      slug={example.slug}
      description={example.description}
      theme={example.theme}
    />
  ));
  const rows = [];
  let currentRow = [];
  for (let i = 0; i < exampleCards.length; i++) {
    currentRow.push(<Col sm={4}>{exampleCards[i]}</Col>);
    if (currentRow.length >= 3) {
      rows.push(<Row>
        {currentRow}
      </Row>);
      currentRow = [];
    }
  }
  if (currentRow.length > 0) {
    rows.push(
      <Row>
        {currentRow}
      </Row>
    );
    currentRow = [];
  }
  return <Container>{rows}</Container>;
}
