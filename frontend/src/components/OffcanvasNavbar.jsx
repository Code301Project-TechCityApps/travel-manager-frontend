import React from 'react';
import { Container, Navbar, Nav, Offcanvas, Form, Button } from 'react-bootstrap';
import AuthButtons from '../Auth/AuthButtons'; // Import AuthButtons component
import { Link } from 'react-router-dom';
import '../css/navbar.css';

function OffcanvasNavbar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary mb-3">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Travel Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/currency">Currency Converter</Nav.Link>
                            <Nav.Link as={Link} to="/translator">Translator Tool</Nav.Link>
                            <Nav.Link as={Link} to="/flight-itinerary">Flight Itinerary</Nav.Link>
                            <AuthButtons />
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default OffcanvasNavbar;
