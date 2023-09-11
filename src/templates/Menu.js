import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
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
                <LinkContainer to="/" ><Navbar.Brand><font color="RED"><strong>HOME</strong></font></Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav><font color="red">----------------------------------------------------------------</font></Nav>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                       
                <LinkContainer to="/cadastroMotoboy"><NavDropdown.Item><strong>Motoboy</strong></NavDropdown.Item></LinkContainer>
                <LinkContainer to="/cadastroEntrega"><NavDropdown.Item><strong>Entregas</strong></NavDropdown.Item></LinkContainer>  
                     
                    </Nav>
                    <Nav><font color="red">----------------------------</font></Nav>
                   
                    <Nav><font color="red">-------------------------------------</font></Nav>
                    <Nav>
                        <Nav.Link href="/"><strong><font color="red">VOLTAR</font></strong></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}