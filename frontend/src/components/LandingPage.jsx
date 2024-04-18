import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="landing-page">
      <h1>Welcome to Our Application</h1>
      <p>Please log in to access the app features.</p>
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
};

export default LandingPage;