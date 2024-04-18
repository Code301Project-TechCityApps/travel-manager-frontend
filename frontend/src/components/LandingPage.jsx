import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import '../css/landingpage.css'; // Make sure this is correctly imported

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container className="landing-page">
      <Row>
        <Col xs={12} className="text-center">
          <Image src="frontend/src/assets/logo.png" alt="Travel Manager Logo"/>
          <h1>Travel Manager</h1>
          <p>Please log in to access the app features.</p>
          <Button variant="primary" onClick={() => loginWithRedirect()}>Log In</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;