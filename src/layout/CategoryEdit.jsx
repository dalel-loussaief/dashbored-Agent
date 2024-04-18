import React, { useState, useEffect } from "react";
import { useParams , useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AreaTop } from "../components";

const CategoryEdit = () => {
    const { id } = useParams();
    const location = useLocation();
    const [categoryData, setCategoryData] = useState({ name: "" });

    useEffect(() => {
        if (location.state && location.state.categoryData) {
            setCategoryData(location.state.categoryData);
        } else {
          fetch(`http://localhost:8000/Property/category-detail/${id}`)
            .then(response => response.json())
            .then(data => setCategoryData(data))
            .catch(error => console.error('Erreur lors de la récupération des données:', error));
        }
      }, [location.state, id]);
    
      

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/Property/category-update/${id}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData),
        })
        .then(response => {
          if (response.ok) {
            toast.success('Category updated successfully', {
              autoClose: 3000 // Ferme le toast après 5 secondes (5000 millisecondes)
            });
            setTimeout(() => {
              window.location.href = '/Category'; // Redirige l'utilisateur vers la page de service après 5 secondes
            }, 3000); // Redirection après 5 secondes
          } else {
            console.error('Failed to update category');
          }
        })
        
        .catch(error => console.error('Erreur lors de la mise à jour du category:', error));
      };

    return (
        <>
            <AreaTop />
            <br />
            <div style={styles.container}>
                <h2 style={styles.heading}>Edit Category</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="name" style={styles.label}>Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={categoryData.name}
                            onChange={handleChange}
                            style={styles.input} />
                    </div>

                    <button type="submit" style={styles.button}>Update</button>
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

export default CategoryEdit;
