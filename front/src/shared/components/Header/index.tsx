import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { User } from '../../@types/user';
import history from '../../history';
interface HeaderProps {
  user?: User;
}

const Header = ({ user }: HeaderProps): JSX.Element => {
  const handleLogout = () => {
    history.push('/logout');
  };
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container className="ml-2">
        <Navbar.Brand href="/">
          <b>JustChatter</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {user && (
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                <NavDropdown.Item>Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
