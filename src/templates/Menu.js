import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import React from "react";

export default function Menu(props){
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: '1px',
    fontWeight: 'bolder',
  };

    return (
      <Navbar style={navbarStyle} bg="black" variant="dark" expand="lg">
      <Container>
      <LinkContainer to ="/"><Navbar.Brand><font color="red">Home</font></Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <LinkContainer to="/FormMotoboy"><NavDropdown.Item><strong>Motoboy</strong></NavDropdown.Item></LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/FormEntrega"><NavDropdown.Item><strong>Entregas</strong></NavDropdown.Item></LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/FormProduto"><NavDropdown.Item><strong>Produtos para entrega</strong></NavDropdown.Item></LinkContainer>
              <NavDropdown.Divider />
              {}
            </NavDropdown>
          </Nav>
          <Nav>
          <Nav.Link href="/"><font color="red">Exit</font></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}