import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import axios from 'axios'; // Import d'Axios
import { Link } from "react-router-dom";
import { AreaTop } from "../components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [deleteModal, setDeleteModal] = useState(null);
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 4;

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/userAuth/contact-delete/${id}/`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.status === 204) {
                setContacts(contacts.filter(contact => contact.id !== id));
                toast.success('Contact deleted successfully',{
                    autoClose: 3000 
                });
                setTimeout(() => {
                    window.location.href = '/ContactList'; 
                  }, 3000);
            } else {
                toast.error('Failed to delete contact: ');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la suppression du contact:', error);
            toast.error('Failed to delete contact: ' );
        });
    };
    

    useEffect(() => {
        // Fonction pour récupérer les contacts depuis l'API
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/userAuth/contacts/');
                setContacts(response.data); // Mettre à jour les contacts avec les données récupérées depuis l'API
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts(); // Appel de la fonction pour récupérer les contacts au chargement du composant
        setDeleteModal(new Modal(document.getElementById('deleteModal'), { backdrop: 'static', keyboard: false }));
    }, []);

    const openDeleteModal = (contactId) => {
        setSelectedContactId(contactId);
        deleteModal.show();
    };

    const closeDeleteModal = () => {
        setSelectedContactId(null);
        deleteModal.hide();
    };

    const renderContacts = () => {
        const filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.message.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const indexOfLastContact = currentPage * contactsPerPage;
        const indexOfFirstContact = indexOfLastContact - contactsPerPage;
        const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

        return currentContacts.map(contact => (
            <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>
                    <div className="btn-group" role="group" aria-label="Action buttons">
                        <button className="btn btn-danger" onClick={() => handleDelete(contact.id)}>
                            <MdDelete />
                        </button>
                    </div>
                </td>
            </tr>
        ));
    };

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <ToastContainer/>
            <AreaTop />
            <br />
            <div style={{ textAlign: "center" }}>
                <h2>Contact List</h2>
                <div className="d-flex justify-content-end mb-3">
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
                            <th>Email</th>
                            <th>Message</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderContacts()}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {[...Array(Math.ceil(contacts.length / contactsPerPage))].map((_, i) => (
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
                                <h5 className="modal-title" id="deleteModalLabel">Delete Contact</h5>
                                <button type="button" className="btn-close" onClick={closeDeleteModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this contact?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={closeDeleteModal}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactList;
