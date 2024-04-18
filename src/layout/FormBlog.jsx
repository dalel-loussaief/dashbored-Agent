import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { AreaTop } from "../components";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormBlog = () => {
  const { id } = useParams();
  const [editedBlog, setEditedBlog] = useState({
    titre: "",
    contenu: "",
    image: "null",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/userAuth/blog-detail/${id}/`);
        setEditedBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('titre', editedBlog.titre);
      formData.append('contenu', editedBlog.contenu);

      // Vérifier si une nouvelle image a été sélectionnée
      if (e.target.image.files[0]) {
        formData.append('image', e.target.image.files[0]);
      }

      const response = await axios.put(`http://localhost:8000/userAuth/blog-update/${id}/`, formData);
      toast.success('Blog updated successfully', {
        autoClose: 3000
      });
      setTimeout(() => {
        window.location.href = '/Blog';
      }, 3000);
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog');
    }
  };

  return (
    <>
      <AreaTop/>
      <br />
      <div style={styles.container}>
        <h2 style={styles.heading}>Edit Blog</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="titre" style={styles.label}>Title:</label>
            <input
              type="text"
              id="titre"
              name="titre"
              value={editedBlog.titre}
              onChange={handleChange}
              style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="contenu" style={styles.label}>Content:</label>
            <textarea
              id="contenu"
              name="contenu"
              value={editedBlog.contenu}
              onChange={handleChange}
              style={styles.textarea} />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="image" style={styles.label}>Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              style={styles.input} />
            {editedBlog.image && (
              <img src={`http://localhost:8000/userAuth${editedBlog.image}`} alt="Blog Image" style={{ maxWidth: "100%", marginTop: "10px" }} />
            )}
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

export default FormBlog;
