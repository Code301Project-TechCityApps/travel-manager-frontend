import { useAuth0 } from '@auth0/auth0-react';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import '../css/landingpage.css';
import logo from '../assets/logo.png';

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="landing-page">
      <Container className='container'>
        <Row>
          <Col xs={12} className="text-center">
            <Image src={logo} alt="Travel Manager Logo" />
            <h1>Travel Manager</h1>
            <p>Please log in to access the app features.</p>
            <Button className='button' variant="warning" size="sm" onClick={() => loginWithRedirect()}>Log In</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
