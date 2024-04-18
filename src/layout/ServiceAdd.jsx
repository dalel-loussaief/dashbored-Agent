import React, { useState } from "react";
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AreaTop } from "../components";

const ServiceAdd = () => {
  const [serviceData, setServiceData] = useState({
    id_service: "", 
    type_service: "" 
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/Property/service-create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        toast.success('Service added successfully',{
        autoClose: 3000 // Ferme le toast après 5 secondes (5000 millisecondes)
      });
      setTimeout(() => {
        window.location.href = '/Service'; // Redirige l'utilisateur vers la page de service après 5 secondes
      }, 3000);
      } else {
        toast.error('Failed to add service');
      }
    } catch (error) {
      toast.error('Erreur lors de l\'ajout du service:', error);
      toast.error('An error occurred while adding service');
    }
  };

  return (
    <>
      <ToastContainer />
      <AreaTop />
      <br />
      <div style={styles.container}>
        <h2 style={styles.heading}>Add Service</h2>
        <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label htmlFor="type_service" style={styles.label}>Type:</label>
          <input
            type="text"
            id="type_service"
            name="type_service" // Le nom doit correspondre à l'attribut de serviceData
            value={serviceData.type_service}
            onChange={handleChange}
            style={styles.input} />
        </div>
          <button type="submit" style={styles.button}>Add</button>
        </form>
      </div>
    </>
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

export default ServiceAdd;
