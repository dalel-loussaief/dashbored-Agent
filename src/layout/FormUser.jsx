import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { AreaTop } from "../components";

const FormUser = () => {
  const { id } = useParams();
  const location = useLocation();
  const [agentData, setAgentData] = useState(location.state ? location.state.agentData : { name: "", address: "", phone: "" });

  useEffect(() => {
    if (location.state && location.state.agentData) {
      setAgentData(location.state.agentData);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Agent data submitted:", agentData);
    setAgentData({ name: "", address: "", phone: "" });
  };

  return (
    <>
    <AreaTop/>
    <br />
    <div style={styles.container}>
      <h2 style={styles.heading}>User Details</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={agentData.name}
            onChange={handleChange}
            style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="address" style={styles.label}>Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={agentData.address}
            onChange={handleChange}
            style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="phone" style={styles.label}>Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={agentData.phone}
            onChange={handleChange}
            style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>Update </button>
      </form>
    </div></>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default FormUser;