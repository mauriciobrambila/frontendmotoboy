import { Container, Navbar, NavDropdown } from "react-bootstrap";
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
                           
            <NavbarCollapse><LinkContainer to="/cadastromotoboy"><NavDropdown.Item><strong><font color="white">Motoboy</font></strong>
                </NavDropdown.Item></LinkContainer></NavbarCollapse>
            <NavbarCollapse><LinkContainer to="/cadastroentrega"><NavDropdown.Item><strong><font color="white">Entregas</font></strong>
                </NavDropdown.Item></LinkContainer></NavbarCollapse>
                  
            </Container>
        </Navbar>
    );
}