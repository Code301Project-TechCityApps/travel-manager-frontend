import React from 'react';
import { Container, Navbar, Nav, Offcanvas, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
                        {/* <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default OffcanvasNavbar;
