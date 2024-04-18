import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit , MdAdd} from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import { Link } from "react-router-dom";
import { AreaTop } from "../components";
import EditPropertyForm from "./EditPropertyForm";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [deleteModal, setDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 4;

  useEffect(() => {
    // Charger les propriétés de l'utilisateur connecté à partir du localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      const userProperties = JSON.parse(localStorage.getItem('userProperties')) || [];
      setProperties(userProperties.filter(property => property.userEmail === loggedInUser.email));
    }
    setDeleteModal(new Modal(document.getElementById('deleteModal'), { backdrop: 'static', keyboard: false }));
  }, []);

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

  const renderProperties = () => {
    const filteredProperties = properties.filter(property =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    return currentProperties.map(property => (
      <tr key={property.id}>
        {/* Render property details */}
      </tr>
    ));
  };

  return (
    <>
    <AreaTop/>
    <br />
    <div style={{ textAlign: "center" }}>
      <h2>Property List</h2>
      <div className="d-flex justify-content-end mb-3">
        {/* Add search input */}
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            {/* Table headers */}
          </tr>
        </thead>
        <tbody>{renderProperties()}</tbody>
      </table>
      {/* Pagination */}
      {/* Delete modal */}
      {/* Edit modal */}
    </div>
    </>
  );
};

export default Property;
