import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { RiArticleFill } from 'react-icons/ri';
import { AiOutlineContacts } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdBuild, MdFeedback, MdMailOutline, MdOutlineMenu, MdOutlineNotifications, MdOutlineAccountCircle } from "react-icons/md";

function SidebarAgent() {
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const profileMenuRef = useRef(null);

  const toggleNotificationMenu = () => {
    setShowNotificationMenu(!showNotificationMenu);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    // Filtrer les éléments de la liste en fonction de la valeur de recherche
    const filtered = items.filter(item => item.toLowerCase().includes(value.toLowerCase()));
    setFilteredItems(filtered);
  };

  const openSidebar = () => {
    // Define your openSidebar function logic here
  };

  // Liste des éléments à filtrer
  const items = [
    "User List",
    "Agent List",
    "Blog",
    "RDV List",
    "Service",
    "Contact List",
    "Testimonial List",
    "Category",
    "Property By Category"
  ];

  // Utilisez filteredItems pour afficher les éléments filtrés
  const displayItems = filteredItems.length > 0 ? filteredItems : items;

  return (
    <>
      <section className="content-area-top">
        <div className="area-top-l">
          <button
            className="sidebar-open-btn"
            type="button"
            onClick={openSidebar}
          >
            <MdOutlineMenu size={32} />
          </button>
          {/* <h2 className="area-top-title">dashboard</h2> */}
        </div>

        <div className="navbar-row">
          <div className="icons-container">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search here"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <div className="navbar-row">
          <div className="icons-container">
            <div className="icon-wrapper" onClick={toggleNotificationMenu}>
              <MdOutlineNotifications size={32} />
              {showNotificationMenu && (
                <div className="notification-menu">
                  <ul>
                    <li>Notification 1</li>
                    <li>Notification 2</li>
                    <li>Notification 3</li>
                  </ul>
                </div>
              )}
            </div>
            <Link to="http://localhost:3000/" className="icon-wrapper">
              <MdOutlineAccountCircle size={32} />
            </Link>
          </div>
        </div>

        <style>{`
          .icons-container {
            display: flex;
            align-items: center;
          }

          .icon-wrapper {
            position: relative;
            margin-right: 10px;
          }

          .search-container {
            display: flex;
            align-items: center;
            margin: 0 auto; /* Centrer horizontalement */
          }

          .search-input {
            padding: 10px 10px;
            border: 2px solid #ccc;
            border-radius: 5px;
            width: 300px; /* Ajustez selon vos besoins */
          }

          .notification-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            z-index: 999;
          }

          .notification-menu ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .notification-menu li {
            padding: 5px 0;
          }

          /* Style pour le cadre de la liste */
          .menu-container {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            margin-top: 10px;
            overflow-x: auto; /* Permettre le défilement horizontal si nécessaire */
          }

          /* Style pour les éléments de la liste */
          .menu-items-container {
            display: flex; /* Afficher les éléments de manière horizontale */
            flex-wrap: nowrap; /* Empêcher le saut à la ligne des éléments */
          }

          /* Style pour le cadre de chaque élément de la liste */
          .menu-item-container {
            flex: 0 0 auto; /* Ne pas permettre le redimensionnement des éléments */
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            margin-right: 10px; /* Ajoutez un espace entre chaque élément */
          }

          .menu-item-container:last-child {
            margin-right: 0; /* Supprimer la marge à droite du dernier élément */
          }
        `}</style>
      </section>

      {/* Envelopper la liste dans une div avec la classe menu-container */}
      <div className="menu-container">
        <ul>

          {displayItems.map((item, index) => (

            <li className="menu-item">





              {item === "Property By Category" && (
                <Link to="/PropertyListByCategory" className="menu-link">
                  <span className="menu-link-icon">
                    <MdBuild size={20} />
                  </span>
                  <span className="menu-link-text">Property By Category</span>
                </Link>
              )}
            </li>

          ))}

        </ul>
      </div>

      {/* <AreaTop /> */}
      {/* <ToastContainer /> */}
    </>
  );
}

export default SidebarAgent;