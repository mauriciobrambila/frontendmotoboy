import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import React from "react";

export default function Menu(props) {
    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: '2px',
        fontWeight: 'bolder',
      };
    return (
        <Navbar style={navbarStyle} bg="black" variant="dark" expand="lg">
            <Container >
                <LinkContainer to="/" ><Navbar.Brand><font color="RED"><strong>HOME</strong></font></Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav><font color="black">----------------------------------------------------------------</font></Nav>
                <NavbarCollapse><LinkContainer to="/cadastromotoboy"><NavDropdown.Item><strong><font color="white">Motoboy</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>
                <NavbarCollapse><LinkContainer to="/cadastroentrega"><NavDropdown.Item><strong><font color="white">Entregas</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>

                    </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}