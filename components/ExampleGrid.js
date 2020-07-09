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
  return <div className="example-grid">{exampleCards}</div>;
}
