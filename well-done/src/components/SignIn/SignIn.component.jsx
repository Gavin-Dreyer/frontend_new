import React, { useState } from "react";

import "./SignIn.styles.scss";

const SignIn = () => {
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const [account, setAccount] = useState({email: "", password: ""})

  const handleChange = event => {
    setAccount({...account,[event.target.name]: event.target.value})
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log('submit', account)
  }
  

  return (
    <div class="body">
      <h1>Wellcome </h1>
      <form onSubmit={handleSubmit} >
        <label>Email
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={account.email}
            // onChange= {event => {
            //   setEmail(event.target.value)
            // }}
            onChange={handleChange}
          />
        </label>
        <label>Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={account.password}
            // onChange= {event => {
            //   setPassword(event.target.value)
            // }}
            onChange={handleChange}
          />
        </label>
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;