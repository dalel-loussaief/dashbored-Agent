import React, { useState } from "react";
import axios from 'axios';
import { AreaTop } from "../components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogAdd = () => {
  const [blogData, setBlogData] = useState({ title: "", date: "", description: "", image: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('titre', blogData.title);
      formData.append('contenu', blogData.description);
      formData.append('image', blogData.image);
      formData.append('date', blogData.date);

      const response = await axios.post('http://localhost:8000/userAuth/blog-create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success("Blog data submitted",{
        autoClose: 3000 
      });
      setTimeout(() => {
        window.location.href = '/Blog'; 
      }, 3000);
      //console.log('Blog created successfully:', response.data);
      // Réinitialiser les champs après la création du blog
      //setBlogData({ title: "", date: "", description: "", image: "" });
    } catch (error) {
      toast.error('Error submitting blog data');
    }
  };

  return (
    <>
      <ToastContainer />
      <AreaTop/>
      <br />
      <div style={styles.container}>
        <h2 style={styles.heading}>Add Blog</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="title" style={styles.label}>Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="date" style={styles.label}>Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={blogData.date}
              onChange={handleChange}
              style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="description" style={styles.label}>Description:</label>
            <textarea
              id="description"
              name="description"
              value={blogData.description}
              onChange={handleChange}
              style={styles.textarea} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="image" style={styles.label}>Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => setBlogData({ ...blogData, image: e.target.files[0] })}
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
  },
};

export default BlogAdd;
