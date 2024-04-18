import React, { useState } from "react";
import { AreaTop } from "../components";

const FormTestimonial = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    note: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Clear form fields after submission
    setFormData({ name: "", message: "", note: 0 });
  };

  return (
    <>
    <AreaTop/>
    <br />
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Testimonial</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={styles.input}
            required />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="message" style={styles.label}>Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            style={styles.textarea}
            required />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="note" style={styles.label}>Note:</label>
          <input
            type="number"
            id="note"
            name="note"
            min="0"
            max="5"
            step="0.1"
            value={formData.note}
            onChange={handleInputChange}
            style={styles.input}
            required />
        </div>
        <button type="submit" style={styles.button}>Submit </button>
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
  textarea: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "100px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default FormTestimonial;
