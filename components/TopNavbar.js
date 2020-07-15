import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function TopNavbar(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Threeify</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/examples">Examples</Nav.Link>
          <Nav.Link href="https://github.com/threeify/threeify">
            Github
          </Nav.Link>
          <Nav.Link href="https://www.npmjs.com/package/threeify">NPM</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
