import React, { useState } from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

import loginImg from "../../login.svg";

export const Login = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { email, password } = inputs;
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    setSubmitted(false);
  }

  const LOGIN_QUERY = gql`
    query($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        userId
        token
        tokenExpiration
      }
    }
  `;

  const [saveLogin] = useQuery(LOGIN_QUERY);

  function handleLogin(e) {
    e.preventDefault();
    setSubmitted(true);

    if (submitted) {
      if (email && password) {
      }
    }
  }

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} alt="Login" />
        </div>
        <div className="form">
          <div className="form-group">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
            {submitted && !email && <div>Email is required</div>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
            {submitted && !password && <div>Password is required</div>}
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};
