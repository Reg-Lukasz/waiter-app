import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return(
    <Navbar bg="primary" variant="dark" className="rounded my-3">
      <Container>
        <Navbar.Brand>Waiter.app</Navbar.Brand>
        <Nav className="justify-content-between">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;