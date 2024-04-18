import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { AreaTop } from "../components";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPropertyForm = () => {
  const { id } = useParams();

  const [editedProperty, setEditedProperty] = useState({
    property_titre: "",
    property_description: "",
    property_surface: "",
    property_dispo: "",
    property_prix: "",
    image: "null",
    category: "" ,
    service:""
  });

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);


  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/userAuth/property-detail/${id}/`);
        setEditedProperty(response.data);
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/userAuth/Show/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/userAuth/service-list/');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchProperty();
    fetchCategories();
    fetchServices();
  }, [id]);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProperty(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('property_titre', editedProperty.property_titre);
      formData.append('property_description', editedProperty.property_description);
      formData.append('property_surface', editedProperty.property_surface);
      formData.append('property_dispo', editedProperty.property_dispo);
      formData.append('property_prix', editedProperty.property_prix);
      formData.append('category', editedProperty.category);
      formData.append('service', editedProperty.service);
      
      // Vérifier si une nouvelle image a été sélectionnée
      if (e.target.image.files[0]) {
        formData.append('image', e.target.image.files[0]);
      }
  
      const response = await axios.post(`http://localhost:8000/userAuth/property-update/${id}/`, formData);
      toast.success('Property updated successfully', {
        autoClose: 3000
      });
      setTimeout(() => {
        window.location.href = '/Property';
      }, 3000);
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Failed to update property');
    }
  };
  
  

  return (
    <>
      <AreaTop/>
      <br />
      <div style={styles.container}>
        <h2 style={styles.heading}>Edit Property</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="property_titre" style={styles.label}>Title:</label>
            <input
              type="text"
              id="property_titre"
              name="property_titre"
              value={editedProperty.property_titre}
              onChange={handleChange}
              style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="property_description" style={styles.label}>Description:</label>
            <textarea
              id="property_description"
              name="property_description"
              value={editedProperty.property_description}
              onChange={handleChange}
              style={styles.textarea} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="property_surface" style={styles.label}>Surface:</label>
            <input
              type="text"
              id="property_surface"
              name="property_surface"
              value={editedProperty.property_surface}
              onChange={handleChange}
              style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="property_dispo" style={styles.label}>Availability:</label>
            <input
              type="text"
              id="property_dispo"
              name="property_dispo"
              value={editedProperty.property_dispo}
              onChange={handleChange}
              style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="property_prix" style={styles.label}>Price:</label>
            <input
              type="text"
              id="property_prix"
              name="property_prix"
              value={editedProperty.property_prix}
              onChange={handleChange}
              style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="image" style={styles.label}>Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              style={styles.input} />
            {editedProperty.image && (
              <img src={`http://localhost:8000/userAuth${editedProperty.image}`} alt="Property Image" style={{ maxWidth: "100%", marginTop: "10px" }} />
            )}
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="category" style={styles.label}>Category:</label>
            <select
              id="category"
              name="category"
              value={editedProperty.category}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.category_id} value={category.category_id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="service" style={styles.label}>Service:</label>
            <select
              id="service"
              name="service"
              value={editedProperty.service}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select a category</option>
              {services.map(service => (
                <option key={service.id_service} value={service.id_service}>{service.type_service}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-sm" style={{ backgroundColor: "#4caf50" }}>Save Changes</button>
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
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "6px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "6px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "80px",
    fontSize: "14px",
  },
};

export default EditPropertyForm;
