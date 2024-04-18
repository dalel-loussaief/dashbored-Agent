import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AreaTop } from "../components";

const PropertyAdd = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [propertyData, setPropertyData] = useState({ property_titre: "", property_description: "", property_surface: "", property_dispo: "", property_prix: "", image: null, category: "", service: "" });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/userAuth/Show/');
        setCategories(response.data);
      } catch (error) {
        toast.error('Error fetching categories');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/userAuth/service-list/');
        setServices(response.data);
      } catch (error) {
        toast.error('Error fetching services');
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setPropertyData(prevState => ({
        ...prevState,
        image: e.target.files[0]
      }));
    } else {
      const { name, value } = e.target;
      setPropertyData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('property_titre', propertyData.property_titre);
      formData.append('property_description', propertyData.property_description);
      formData.append('property_surface', propertyData.property_surface);
      formData.append('property_dispo', propertyData.property_dispo);
      formData.append('property_prix', propertyData.property_prix);
      formData.append('category', propertyData.category);
      formData.append('service', propertyData.service);
      formData.append('image', propertyData.image);

      const response = await axios.post('http://localhost:8000/userAuth/property-create/', formData);
      toast.success("Property data submitted", {
        autoClose: 3000
      });
      setTimeout(() => {
        window.location.href = '/Property';
      }, 3000);
    } catch (error) {
      toast.error('Error submitting property data');
    }
  };

  return (
    <>
      <ToastContainer />
      <AreaTop />
      <br />
      <div style={styles.container}>
        <h2 style={styles.heading}>Add Property</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formRow}>
            <div style={{ flex: 1 }}>
              <div style={styles.formGroup}>
                <label htmlFor="property_titre" style={styles.label}>Title:</label>
                <input
                  type="text"
                  id="property_titre"
                  name="property_titre"
                  value={propertyData.property_titre}
                  onChange={handleChange}
                  style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="property_dispo" style={styles.label}>Availability:</label>
                <input
                  type="text"
                  id="property_dispo"
                  name="property_dispo"
                  value={propertyData.property_dispo}
                  onChange={handleChange}
                  style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="category" style={styles.label}>Category:</label>
                <select
                  id="category"
                  name="category"
                  value={propertyData.category}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.category_id} value={category.category_id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={styles.formGroup}>
                <label htmlFor="property_surface" style={styles.label}>Surface:</label>
                <input
                  type="text"
                  id="property_surface"
                  name="property_surface"
                  value={propertyData.property_surface}
                  onChange={handleChange}
                  style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="property_prix" style={styles.label}>Price:</label>
                <input
                  type="text"
                  id="property_prix"
                  name="property_prix"
                  value={propertyData.property_prix}
                  onChange={handleChange}
                  style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="service" style={styles.label}>Service:</label>
                <select
                  id="service"
                  name="service"
                  value={propertyData.service}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service.id_service} value={service.id_service}>{service.type_service}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="image" style={styles.label}>Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="property_description" style={styles.label}>Description:</label>
            <textarea
              id="property_description"
              name="property_description"
              value={propertyData.property_description}
              onChange={handleChange}
              style={{ ...styles.textarea, width: '100%' }} />
          </div>

          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>Add</button>
          </div>
        </form>
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
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
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formRow: {
    display: "flex",
    marginBottom: "15px",
  },
  formGroup: {
    marginRight: "15px",
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
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "100px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default PropertyAdd;
