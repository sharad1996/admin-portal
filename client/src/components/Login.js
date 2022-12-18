import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../apis";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async () => {
    if (input.email === "" && input.pass === "") {
      alert("Please Enter details properly");
      return;
    }
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    };
    const response = await fetchApi("auth/login", options);
    if (response?.token) {
      const token = response.token;
      localStorage.setItem("token", token);
      navigate("/dashboard", { state: { email: input.email } });
    } else {
      alert(response?.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <h3>Log In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name={"password"}
              value={input.password}
              onChange={handleChange}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
