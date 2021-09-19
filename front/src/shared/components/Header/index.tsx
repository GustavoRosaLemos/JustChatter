import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
const Header = (): JSX.Element => (
  <Navbar bg="primary" variant="dark" expand="lg">
    <Container fluid className="ml-2">
      <Navbar.Brand href="/">
        <b>JustChatter</b>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <NavDropdown title="Gustavo" id="basic-nav-dropdown" style={{ marginRight: '80px' }}>
            <NavDropdown.Item>Perfil</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Sair</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
