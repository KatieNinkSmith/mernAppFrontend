import { useState } from "react";
import SignUpForm from "../components/SignUpForm.jsx";
import LoginForm from "../components/LoginForm.jsx";

function AuthPage(props) {
  const [signUp, setSignUp] = useState(true);

  function togglePage() {
    setSignUp(!signUp);
  }

  return (
    <>
      <h1>Sign Up or Log In!</h1>
      <>
        {signUp ? (
          <SignUpForm setUser={props.setUser} />
        ) : (
          <LoginForm setUser={props.setUser} />
        )}
      </>
      Or go here to:
      <br />
      <button onClick={togglePage}>{signUp ? "Log In" : "Register"}</button>
    </>
  );
}

export default AuthPage;
