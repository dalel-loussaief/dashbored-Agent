import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AreaTop } from "../components";

const Service = () => {
    const [agents, setAgents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const agentsPerPage = 4; // Nombre d'agents par page

    useEffect(() => {
        fetch('http://localhost:8000/Property/service-list/')
            .then(response => response.json())
            .then(data => setAgents(data))
            .catch(error => console.error('Erreur lors de la récupération des données:', error));
    }, []);

    const filteredAgents = agents.filter(agent =>
        agent.type_service.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastAgent = currentPage * agentsPerPage;
    const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
    const currentAgents = filteredAgents.slice(indexOfFirstAgent, indexOfLastAgent);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/Property/service-delete/${id}/`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setAgents(agents.filter(agent => agent.id_service !== id));
                toast.success('Service deleted successfully',{
                    autoClose: 3000 
                  });
                  setTimeout(() => {
                    window.location.href = '/Service'; 
                  }, 3000);
            } else {
                toast.error('Failed to delete service');
            }
        })
        .catch(error => toast.error('Erreur lors de la suppression du service:', error));
    };

    return (
        <>
        <ToastContainer/>
            <AreaTop/>
            <br />
            <div style={{ textAlign: "center" }}>
                <h2>List Services</h2>
                <div className="d-flex justify-content-end mb-3">
                    <Link to="/ServiceAdd">
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
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAgents.map(agent => (
                            <tr key={agent.id_service}>
                                <td>{agent.type_service}</td>
                                <td>
                                    <Link to={`/FormService/${agent.id_service}`} state={{ agentData: agent }}>
                                        <button className="btn btn-primary">
                                            <MdEdit />
                                        </button>
                                    </Link>
                                    
                                    <button className="btn btn-danger" onClick={() => handleDelete(agent.id_service)}>
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {[...Array(Math.ceil(filteredAgents.length / agentsPerPage))].map((_, i) => (
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

export default Service;
