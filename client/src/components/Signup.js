import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../apis";

const SignUp = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
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
    const response = await fetchApi("auth/signup", options);
    if (response?.id) {
      navigate("/");
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
            handleSubmit();
          }}
        >
          <h3>Sign Up</h3>

          <div className="mb-3">
            <label>Enter Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
          </div>
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
              name="password"
              value={input.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="isAdmin">Admin</label>
            <input
              type={"checkbox"}
              name="isAdmin"
              value={input.isAdmin}
              onChange={(e) => {
                setInput({ ...input, isAdmin: e.target.checked });
              }}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/signin">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
