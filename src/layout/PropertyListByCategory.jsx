import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";
import { AreaTop } from "../components";
import { Modal } from 'bootstrap';
import EditPropertyForm from "./EditPropertyForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PropertyListByCategory() {
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [properties, setProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 4;
    const [deleteModal, setDeleteModal] = useState(null);
    const [editModal, setEditModal] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [    selectedServiceId
        , setSelectedServiceId] = useState(null);

    const [selectedProperty, setSelectedProperty] = useState(null);

    const openDeleteModal = (propertyId) => {
        setSelectedProperty(propertyId);
        deleteModal.show();
    };

    const closeDeleteModal = () => {
        setSelectedProperty(null);
        deleteModal.hide();
    };

    const closeEditModal = () => {
        setSelectedProperty(null);
        editModal.hide();
    };

    useEffect(() => {
        setDeleteModal(new Modal(document.getElementById('deleteModal'), { backdrop: 'static', keyboard: false }));
    }, []);

    const deleteProperty = async (propertyId) => {
        try {
            await axios.delete(`http://localhost:8000/userAuth/property-delete/${propertyId}/`);
            // Mettre à jour la liste des propriétés après la suppression
            setProperties(properties.filter(property => property.id !== propertyId));
            toast.success('Property deleted successfully');
        } catch (error) {
            console.error('Error deleting property:', error);
            toast.error('Failed to delete property');
        }
    };

    //categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/userAuth/Show/');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8000/userAuth/service-list/');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);


    useEffect(() => {
        const fetchProperties = async () => {
            if (selectedCategoryId !== null && selectedServiceId !== null) {
                try {
                    const response = await axios.get(`http://localhost:8000/userAuth/properties-by-category-and-service/${selectedCategoryId}/${selectedServiceId}/`);
                    setProperties(response.data);
                } catch (error) {
                    console.error('Error fetching properties:', error);
                }
            }
        };

        fetchProperties();
    }, [selectedCategoryId, selectedServiceId]);


    const handleCategoryChange = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };

    const handleServiceChange = (serviceId) => {
        // Mettre à jour l'état avec l'identifiant du service sélectionné
        setSelectedServiceId(serviceId);
    };



    const renderProperties = () => {
        const filteredProperties = properties.filter(property =>
            property.property_titre.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const indexOfLastProperty = currentPage * propertiesPerPage;
        const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
        const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

        return currentProperties.map(property => (
            <tr key={property.id}>
                <td>{property.property_titre}</td>
                <td>{property.property_description}</td>
                <td>{property.property_surface}</td>
                <td>{property.property_dispo}</td>
                <td>{property.property_prix}</td>
                <td><img src={`http://localhost:8000/userAuth${property.image}`} alt={property.property_titre} className="img-fluid" style={{ maxWidth: '50px', maxHeight: '50px' }} /></td>
                <td>
                    <Link to={`/EditPropertyForm/${property.id}`} state={{ editedProperty: property }}>
                        <button className="btn btn-primary" >
                            <MdEdit />
                        </button>
                    </Link>
                    <button className="btn btn-danger" onClick={() => openDeleteModal(property.id)}>
                        <MdDelete />
                    </button>
                </td>
            </tr>
        ));
    };

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <><AreaTop />
            <ToastContainer />
            <div className="container">
                <h1 className="mt-4">
                    Search properties 
                    {/* <Link to="/PropertyAdd">
                        <MdAdd style={{ fontSize: "30px", cursor: "pointer", marginLeft: "660px" }} />
                    </Link> */}
                </h1>
                <br />
                <select className="form-select mb-3" onChange={(e) => handleCategoryChange(e.target.value)}>
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category.category_id} value={category.category_id}>{category.name}</option>
                    ))}
                </select>
                <select className="form-select mb-3" onChange={(e) => handleServiceChange(e.target.value)}>
                    <option value="">Select a service</option>
                    {services.map(service => (
                        <option key={service.id_service} value={service.id_service}>{service.type_service}</option>
                    ))}
                </select>


                <input
                    type="search"
                    className="form-control mb-3"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th className="col">Title</th>
                            <th className="col">Description</th>
                            <th className="col">Surface</th>
                            <th className="col">Availability</th>
                            <th className="col">Price</th>
                            <th className="col">Image</th>
                            <th className="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderProperties()}
                        </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {[...Array(Math.ceil(properties.length / propertiesPerPage))].map((_, i) => (
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
                                <h5 className="modal-title" id="deleteModalLabel">Delete Property</h5>
                                <button type="button" className="btn-close" onClick={closeDeleteModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this property?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={() => { deleteProperty(selectedProperty); closeDeleteModal(); }}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editModalLabel">Edit Property</h5>
                                <button type="button" className="btn-close" onClick={closeEditModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {selectedProperty && <EditPropertyForm property={selectedProperty} />}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    );
}

export default PropertyListByCategory;
