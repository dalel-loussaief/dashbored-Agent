import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify'; // Assurez-vous d'avoir installé react-toastify
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem('storedEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleEmail = (e) => { 
    setEmail(e.target.value);
    localStorage.setItem('storedEmail', e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all the fields");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8000/userAuth/api/login", {
        email: email,
        password: password
      });

      // Assurez-vous que la réponse contient un champ 'data' avec le rôle de l'utilisateur
      const { data } = res;
      if (data.role === 'admin') {
        window.location.href = 'http://localhost:5173';
      } else {
        window.location.href = 'http://localhost:5174';
      }
    } catch (error) {
      console.error('Error:', error);
      // Gérez les erreurs de connexion ici
    }
  };

  return (
    <div className="container">
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Log In</h1>
          <span>Your email and password</span>
          <input type="email" placeholder="Email" value={email} onChange={handleEmail} />
          <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
          <button type="submit">Log In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <h2>Welcome to MartVilla</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
