import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // To show error on UI
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // 1. Send the login request
      const res = await API.post("/auth/login", form);

      // 2. Check if token exists in response
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      // 3. Log the ACTUAL backend error message
      const errorMsg = err.response?.data?.message || "Login failed. Check your credentials.";
      console.error("Backend Error:", errorMsg);
      setError(errorMsg);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Email" 
          type="email"
          required
          onChange={e => setForm({...form, email: e.target.value})} 
        />
        <br /><br />
        <input 
          type="password" 
          placeholder="Password" 
          required
          onChange={e => setForm({...form, password: e.target.value})} 
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;