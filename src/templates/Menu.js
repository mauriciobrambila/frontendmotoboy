import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { LinkContainer } from "react-router-bootstrap";
import React from "react";

export default function Menu(props) {
    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        fontWeight: 'bolder',
      };

    return (
        <Navbar style={navbarStyle} bg="black" variant="dark" expand="lg">
        <Container >
            <LinkContainer to="/" ><Navbar.Brand><font color="white"><strong>HOME</strong></font></Navbar.Brand></LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav><font color="black">-------</font></Nav>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    
                    <NavDropdown title="CADASTROS" id="basic-nav-dropdown">
                        <LinkContainer to="/cadastroHospedes"><NavDropdown.Item><strong>Hospedes</strong></NavDropdown.Item></LinkContainer>

                        <LinkContainer to="/cadastroEntrada"><NavDropdown.Item><strong>Entrada</strong></NavDropdown.Item></LinkContainer>

                        <LinkContainer to="/cadastroTelefones"><NavDropdown.Item><strong>Telefone</strong></NavDropdown.Item></LinkContainer>
                    </NavDropdown>
                </Nav>
               
                    <Nav>
                        <Nav.Link href="/"><strong><font color="red">VOLTAR</font></strong></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}