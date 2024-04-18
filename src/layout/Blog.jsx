import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import { Link } from "react-router-dom";
import { AreaTop } from "../components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [deleteModal, setDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;

  const openDeleteModal = (articleId) => {
    setSelectedArticle(articleId);
    deleteModal.show();
  };

  const closeDeleteModal = () => {
    setSelectedArticle(null);
    deleteModal.hide();
  };

  const closeEditModal = () => {
    setSelectedArticle(null);
    editModal.hide();
  };


  const handleDelete = (id) => {
    fetch(`http://localhost:8000/userAuth/blog-delete/${id}/`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
          setArticles(articles.filter(article => article.id !== selectedArticle));
          toast.success('Service deleted successfully',{
            autoClose: 3000 
          });
          setTimeout(() => {
            window.location.href = '/Blog'; 
          }, 3000);
        } else {
            toast.error('Failed to delete service');
        }
    })
    .catch(error => toast.error('Erreur lors de la suppression du service:', error));
};

  useEffect(() => {
    fetch('http://localhost:8000/userAuth/blogs/')
      .then(response => response.json())
      .then(data => setArticles(data.map(article => ({
        ...article,
        date: new Date(article.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric"
        })
      }))))
      .catch(error => console.error('Error fetching data:', error));

    setDeleteModal(new Modal(document.getElementById('deleteModal'), { backdrop: 'static', keyboard: false }));
  }, []);

  const renderArticles = () => {
    const filteredArticles = articles.filter(article =>
      article.titre.toLowerCase().includes(searchTerm && searchTerm.toLowerCase())
    );
  
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  
    return currentArticles.map(article => (
      <tr key={article.id}>
        <td>{article.titre}</td>
        <td>{article.date}</td>
        <td>{article.contenu}</td>
        <td><img src={`http://localhost:8000/userAuth${article.image}`} alt={article.titre} className="img-fluid" style={{ maxWidth: '50px', maxHeight: '50px' }} /></td>
        <td>
          <Link to={`/FormBlog/${article.id}`} state={{ blogData: article }}>
            <button className="btn btn-primary">
              <MdEdit />
            </button>
          </Link>
          <button className="btn btn-danger" onClick={() => handleDelete(article.id)}>
            <MdDelete />
          </button>
        </td>
      </tr>
    ));
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <ToastContainer />
      <AreaTop />
      <br />
      <div style={{ textAlign: "center" }}>
        <h2>Blog List</h2>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/BlogAdd">
            <MdAdd style={{ color: "#007bff", fontSize: "24px", cursor: "pointer", marginRight: "5px" }} />
          </Link>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderArticles()}</tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {[...Array(Math.ceil(articles.length / articlesPerPage))].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Delete Article</h5>
                <button type="button" className="btn-close" onClick={closeDeleteModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this article?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Edit Article</h5>
                <button type="button" className="btn-close" onClick={closeEditModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {selectedArticle && <FormBlog article={selectedArticle} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
