import React, { useState } from "react";
import { AreaTop } from "../components";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryAdd = () => {
    const [categoryData, setCategoryData] = useState({ 
        category_id:"",
        name: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:8000/Property/category-create/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryData),
          });
    
          if (response.ok) {
            toast.success('Category added successfully',{
            autoClose: 3000 
          });
          setTimeout(() => {
            window.location.href = '/Category'; 
          }, 3000);
          } else {
            toast.error('Failed to add category');
          }
        } catch (error) {
          toast.error('Erreur lors de l\'ajout du category:', error);
          toast.error('An error occurred while adding category');
        }
      };

    return (
        <>
            <AreaTop/>
            <br />
            <div style={styles.container}>
                <h2 style={styles.heading}>Add Category</h2>
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

export default CategoryAdd;
