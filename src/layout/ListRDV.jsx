import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdCheckCircle, MdCancel } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap'; 
import { AreaTop } from "../components";
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListRDV = () => {
    const [rdvs, setRdvs] = useState([]);
    const [acceptModal, setAcceptModal] = useState(null);
    const [deleteModal, setDeleteModal] = useState(null);
    const [selectedRdvId, setSelectedRdvId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [acceptMessage, setAcceptMessage] = useState(""); // Nouveau state pour le message d'acceptation
    const [emailDestinataire, setEmailDestinataire] = useState("");
    const [contenuEmail, setContenuEmail] = useState("");
    const rdvsPerPage = 4;

    const fetchRDVs = async () => {
        try {
            const response = await fetch('http://localhost:8000/userAuth/rdvs/');
            const data = await response.json();
            setRdvs(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des RDVs :', error);
        }
    };

    useEffect(() => {
        fetchRDVs();
        setAcceptModal(new Modal(document.getElementById('acceptModal'), { backdrop: 'static', keyboard: false }));
        setDeleteModal(new Modal(document.getElementById('deleteModal'), { backdrop: 'static', keyboard: false }));
    }, []);

    const openAcceptModal = () => {
        acceptModal.show();
    };

    const closeAcceptModal = () => {
        acceptModal.hide();
    };

    const openDeleteModal = (rdvId) => {
        setSelectedRdvId(rdvId);
        deleteModal.show();
    };

    const closeDeleteModal = () => {
        setSelectedRdvId(null);
        deleteModal.hide();
    };

    const deleteRDV = async () => {
        try {
            const response = await fetch(`http://localhost:8000/userAuth/rdv-delete/${selectedRdvId}/`, {
                method: 'DELETE'
            });
            // Mettre à jour la liste des RDVs après suppression
            fetchRDVs();
            // Fermer la modal de suppression
            closeDeleteModal();
            } catch (error) {
            console.error('Erreur lors de la suppression du Appointment :', error);
            toast.error('An error occurred while deleting the  appointment');

        }
    };

    const acceptRDV = async () => {
        try {
            const response = await fetch('http://localhost:8000/userAuth/envoyer-email/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email_destinataire: emailDestinataire,
                    contenu_email: contenuEmail
                }),
            });
            if (response.ok) {
                console.log('Email envoyé avec succès !');
                // Afficher une notification pour informer l'utilisateur que l'email a été envoyé
                toast.success('Email envoyé avec succès !');
                // Fermer la modal d'acceptation
                closeAcceptModal();
            } else {
                const errorMessage = await response.text();
                console.error('Erreur lors de l\'envoi de l\'email :', errorMessage);
                toast.error(`Une erreur s'est produite lors de l'envoi de l'email : ${errorMessage}`);
            }
        } catch (error) {
            console.error('Erreur lors de la requête d\'envoi de l\'email :', error);
            toast.error('Une erreur s\'est produite lors de l\'envoi de l\'email');
        }
    };
    
    
    

    const renderRDVs = () => {
        const filteredRdvs = rdvs.filter(rdv =>
            rdv.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rdv.date.includes(searchTerm)
        );

        const indexOfLastRDV = currentPage * rdvsPerPage;
        const indexOfFirstRDV = indexOfLastRDV - rdvsPerPage;
        const currentRDVs = filteredRdvs.slice(indexOfFirstRDV, indexOfLastRDV);

        return currentRDVs.map(rdv => (
            <tr key={rdv.id}>
                <td>{rdv.fullname}</td>
                <td>{rdv.email}</td>
                <td>{rdv.date}</td>
                <td>{rdv.phone}</td>
                <td>
                    <button className="btn btn-success" onClick={() => openAcceptModal()}>
                        <MdCheckCircle />
                    </button>
                    <button className="btn btn-danger" onClick={() => openDeleteModal(rdv.id)}>
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
        <AreaTop/>
        <br />
        <div style={{ textAlign: "center" }}>
            <h2>List Appointments</h2>
            <div className="d-flex justify-content-end mb-3">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Rechercher"
                    aria-label="Rechercher"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRDVs()}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    {[...Array(Math.ceil(rdvs.length / rdvsPerPage))].map((_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="modal fade" id="acceptModal" tabIndex="-1" aria-labelledby="acceptModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="acceptModalLabel">Accepter le RDV</h5>
                            <button type="button" className="btn-close" onClick={closeAcceptModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="emailDestinataire" className="form-label">Email </label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="emailDestinataire" 
                                    value={emailDestinataire} 
                                    onChange={(e) => setEmailDestinataire(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contenuEmail" className="form-label">Contenu de l'email</label>
                                <textarea 
                                    className="form-control" 
                                    id="contenuEmail" 
                                    value={contenuEmail} 
                                    onChange={(e) => setContenuEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeAcceptModal}>Fermer</button>
                            <button type="button" className="btn btn-success" onClick={acceptRDV}>Accepter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Supprimer le RDV</h5>
                            <button type="button" className="btn-close" onClick={closeDeleteModal} aria-label="Fermer"></button>
                        </div>
                        <div className="modal-body">
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="emailDestinataire" className="form-label">Email destinataire</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="emailDestinataire" 
                                    value={emailDestinataire} 
                                    onChange={(e) => setEmailDestinataire(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contenuEmail" className="form-label">Contenu de l'email</label>
                                <textarea 
                                    className="form-control" 
                                    id="contenuEmail" 
                                    value={contenuEmail} 
                                    onChange={(e) => setContenuEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>envoyer email</button>
                            <button type="button" className="btn btn-danger" onClick={deleteRDV}>Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div></>
    );
};

export default ListRDV;
