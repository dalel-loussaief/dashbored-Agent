import React, { useState, useRef } from 'react';
import { AreaTop } from '../components';

const Profil = () => {
  const fileInputRef = useRef(null); // Référence pour l'input de type file

  // State pour stocker les données du formulaire et les erreurs
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
    profileImage: null // Pour stocker l'image de profil
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: ''
  });

  // Fonction pour mettre à jour les données du formulaire lors de la saisie
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Réinitialiser l'erreur du champ lorsque l'utilisateur commence à taper à nouveau
    setFormErrors({ ...formErrors, [name]: '' });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des champs
    const errors = {};
    Object.keys(formData).forEach(key => {
      const errorMessage = validateField(key, formData[key]);
      if (errorMessage) {
        errors[key] = errorMessage;
      }
    });

    // Affichage des erreurs s'il y en a
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Si pas d'erreurs, envoyer les données au serveur ou effectuer d'autres actions
    console.log(formData);
  };

  // Fonction pour valider un champ spécifique
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        return value.trim() ? '' : 'Name is required';
      case 'lastName':
        return value.trim() ? '' : 'Last name is required';
      case 'email':
        return /^\S+@\S+\.\S+$/.test(value) ? '' : 'Email is invalid';
      case 'address':
        return value.trim() ? '' : 'Address is required';
      case 'phoneNumber':
        return /^\d{10}$/.test(value) ? '' : 'Phone number is invalid';
      default:
        return '';
    }
  };

  // Fonction pour gérer le clic sur l'image de profil
  const handleImageClick = () => {
    fileInputRef.current.click(); // Déclenche l'input de type file
  };

  return (
    <>
    <AreaTop/>
    <br />
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-3 shadow w-50">
        <h2 className="mb-2">Update profil</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <input
              type="file"
              ref={fileInputRef}
              className="d-none" // Rend l'input invisible
              accept="image/*"
              onChange={handleChange} />
            <div className="mb-1">
              {formData.profileImage && (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Profile"
                  className="rounded-circle mt-1"
                  style={{ width: '150px', height: '150px', cursor: 'pointer' }}
                  onClick={handleImageClick} // Appelle la fonction lorsque l'utilisateur clique sur l'image
                />
              )}
              {!formData.profileImage && (
                <div
                  className="rounded-circle mt-3"
                  style={{ width: '150px', height: '150px', backgroundColor: '#f0f0f0', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  onClick={handleImageClick}
                >
                  <i className="bi bi-person fs-1"></i> {/* Icône par défaut si aucune image n'est sélectionnée */}
                </div>
              )}
            </div>
            {formErrors.name && <p className="text-danger">{formErrors.name}</p>}
            <label htmlFor="name" className="form-label">name:</label>
            <input
              type="text"
              className="form-control form-control-md"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange} />
          </div>
          {formErrors.lastName && <p className="text-danger">{formErrors.lastName}</p>}
          <div className="mb-1">
            <label htmlFor="lastName" className="form-label">Last name:</label>
            <input
              type="text"
              className="form-control form-control-md"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange} />
          </div>
          {formErrors.email && <p className="text-danger">{formErrors.email}</p>}
          <div className="mb-1">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control form-control-md"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange} />
          </div>
          {formErrors.address && <p className="text-danger">{formErrors.address}</p>}
          <div className="mb-1">
            <label htmlFor="address" className="form-label">Adress:</label>
            <input
              type="text"
              className="form-control form-control-md"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange} />
          </div>
          {formErrors.phoneNumber && <p className="text-danger">{formErrors.phoneNumber}</p>}
          <div className="mb-2">
            <label htmlFor="phoneNumber" className="form-label">Phone:</label>
            <input
              type="text"
              className="form-control form-control-md"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-md">Update</button>
        </form>
      </div>
    </div></>
  );
};

export default Profil;
