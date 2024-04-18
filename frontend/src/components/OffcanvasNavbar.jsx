import React from 'react';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthButtons from '../Auth/AuthButtons'; // Import AuthButtons component

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
                        </Nav>
                        {/* AuthButtons added to the navbar for user authentication */}
                        <AuthButtons />
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default OffcanvasNavbar;
