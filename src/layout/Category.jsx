import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdAdd  } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AreaTop } from "../components";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 4; // Nombre de catégories par page

    useEffect(() => {
        fetch('http://localhost:8000/Property/Show/')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Erreur lors de la récupération des données:', error));
    }, []);

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/Property/category-delete/${id}/`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setCategories(categories.filter(category => category.category_id !== id));
                toast.success('Category deleted successfully');
            } else {
                toast.error('Failed to delete category');
            }
        })
        .catch(error => toast.error('Erreur lors de la suppression de la catégorie:', error));
    };

    return (
        <>
            <AreaTop/>
            <br />
            <div style={{ textAlign: "center" }}>
                <h2>List Categories</h2>
                <div className="d-flex justify-content-end mb-3">
                    <Link to="/CategoryAdd">
                        <MdAdd style={{ color: "green", fontSize: "24px", cursor: "pointer", marginRight: "5px" }} />
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
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCategories.map(category => (
                            <tr key={category.category_id}>
                                <td>{category.name}</td>
                                <td>
                                    <Link to={`/CategoryEdit/${category.category_id}`}>
                                        <button className="btn btn-primary">
                                            <MdEdit />
                                        </button>
                                    </Link>
                                    
                                    <button className="btn btn-danger" onClick={() => handleDelete(category.category_id)}>
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {[...Array(Math.ceil(filteredCategories.length / categoriesPerPage))].map((_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Category;
