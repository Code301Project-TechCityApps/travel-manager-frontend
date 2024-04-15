import { withAuth0 } from '@auth0/auth0-react';
import AuthButtons from './Auth/AuthButtons';
// import Login from './Auth/Login';
// import Logout from './Auth/Logout';

function App(props) {
    return(
      <>
        <div>
          Login or Logout with one component <AuthButtons />
        </div>


      
        {props.auth0.isAuthenticated &&
          <>
          <h1>Testing?</h1>
          </>
        }
      </>
    )
  }

export default withAuth0(App);
