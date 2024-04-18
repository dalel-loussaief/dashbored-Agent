import React, { useState, useEffect, useRef } from "react";
import { MdOutlineMenu, MdOutlineNotifications, MdOutlineSearch, MdOutlineMessage , MdOutlineAccountCircle} from "react-icons/md";
import { Link } from "react-router-dom";
import "./AreaTop.scss";
import { useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import { MdNotificationsActive } from "react-icons/md";

const AreaTop = () => {
  const { openSidebar } = useContext(SidebarContext);
  const notificationMenuRef = useRef(null);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const [loggedInEmail, setLoggedInEmail] = useState('');
  const [rdvs, setRdvs] = useState([]);

  useEffect(() => {
    // Récupérer l'e-mail stocké dans le localStorage
    const email = localStorage.getItem('loggedInEmail');
    if (email) {
      setLoggedInEmail(email);
    }
  }, []);

  useEffect(() => {
    const fetchRDVs = async () => {
      try {
        const response = await fetch('http://localhost:8000/userAuth/rdvs/');
        const data = await response.json();
        data.sort((a, b) => new Date(a.date) - new Date(b.date));     // Trier les rendez-vous par date croissante
        setRdvs(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des RDVs :', error);
      }
    };

    fetchRDVs();
  }, []);

  const handleClickOutside = (event) => {
    if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target)) {
      setShowNotificationMenu(false);
    }
  };

  const toggleNotificationMenu = () => {
    setShowNotificationMenu(!showNotificationMenu);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    if (showNotificationMenu) {
      setShowNotificationMenu(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
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
          
          <div className="icon-wrapper">
            <MdOutlineNotifications size={32} onClick={toggleNotificationMenu} />
            {showNotificationMenu && (
              <div className="notification-menu" ref={notificationMenuRef}>
                <ul className="notification-list">
                  {rdvs.slice(0, 3).map(rdv => (
                    <li key={rdv.id} className="notification-item">
                      {rdv.fullname} wants to make an appointment on   {rdv.date} .
                      
                    </li>
                  ))}
                  {rdvs.length > 3 && (
                    <li>
                      <Link to="/ListRDV" className="view-all-btn">View All</Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
      
          {/* Profile Dropdown */}
          <ul className="navbar-nav ml-auto">

            <li className="nav-item dropdown" onClick={toggleProfileMenu}>
          
           
              <div className="icon-wrapper" onClick={toggleProfileMenu} ref={profileMenuRef}>
          
            <MdOutlineAccountCircle size={32} />    
       
            {showProfileMenu && (
              
              <div className="profile-menu">
          <div className="profile-email">
            {loggedInEmail && (
              <p>{loggedInEmail}</p>
            )}
          </div>

                <ul>
               
                  <li><a href="http://localhost:3000/">logout</a></li>
               
                </ul>       
              </div>
            )} </div>
            </li>
          </ul>
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

        .notification-menu {
          position: absolute;
          top: calc(100% + 5px);
          background-color: #fff;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
          z-index: 1000;
          width: 200px;
          right: -40px;
          width:200px;
        }

        .notification-menu ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .notification-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .notification-item {
          padding: 5px 0;
          border-bottom: 1px solid #ccc;
        }
        
        .notification-item:last-child {
          border-bottom: none; /* Supprimer la bordure inférieure du dernier élément */
        
        }
        
        .notification-text {
          font-weight: bold;
        }
        
        .notification-date {
          color: #666;
          font-size: 0.9rem;
        }
        
        .view-all-btn {
          display: block;
          text-align: center;
          margin-top: 10px;
          padding: 5px 10px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          text-decoration: none;
        }
        
        .view-all-btn:hover {
          background-color: #0056b3;
        }
        .notification-menu li {
          cursor: pointer;
          padding: 5px 0;
        }

        .icon-wrapper:hover .notification-menu {
          display: block;
        }

        .search-container {
          display: flex;
          align-items: center;
          margin: 0 auto; /* Centrer horizontalement */
        }

        .search-input {
          padding: 5px 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 200px; /* Ajustez selon vos besoins */
        }
      `}</style>
    </section>
  );
};

export default AreaTop;
