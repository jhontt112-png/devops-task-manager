import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  // 1. Using 'username' or 'name'—ensure this matches your MySQL column names!
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear old errors

    try {
      // 2. Send the request
      const res = await API.post("/auth/register", form);
      
      if (res.status === 201 || res.status === 200) {
        alert("Registered Successfully");
        // 3. Navigate to the login page route
        navigate("/login"); 
      }
    } catch (err) {
      // 4. This is critical for fixing that 400 error!
      const serverMessage = err.response?.data?.message || "Registration failed";
      setError(serverMessage);
      console.error("Backend Error Details:", err.response?.data);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Name" 
          required
          onChange={e => setForm({...form, name: e.target.value})} 
        />
        <br /><br />
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
        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;