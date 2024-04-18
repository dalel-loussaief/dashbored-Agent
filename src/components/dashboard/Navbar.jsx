import React, { useState } from 'react';
import { MdSearch, MdNotifications, MdMessage, MdPerson } from 'react-icons/md';

const Navbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const toggleMessagesDropdown = () => {
    setShowMessagesDropdown(!showMessagesDropdown);
  };

  const toggleNotificationsDropdown = () => {
    setShowNotificationsDropdown(!showNotificationsDropdown);
  };

  const handleLogout = () => {
    // Logique de déconnexion ici
  };



  return (
    <div style={styles.navbar}>
      <div style={styles.leftSection}>
        <div style={styles.searchBar}>
          <MdSearch style={styles.icon} />
          <input type="text" placeholder="Search..." style={styles.input} />
        </div>
      </div>
      <div style={styles.rightSection}>
        <div style={{ position: 'relative', marginRight: '20px' }}>
          <MdNotifications onClick={toggleNotificationsDropdown} onMouseLeave={() => setShowNotificationsDropdown(false)} style={styles.icon} />
          {showNotificationsDropdown && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownItem}>Notification 1</div>
              <div style={styles.dropdownItem}>Notification 2</div>
              {/* Ajoutez plus d'éléments de notification si nécessaire */}
            </div>
          )}
        </div>
        <div style={{ position: 'relative', marginRight: '20px' }}>
          <MdMessage onClick={toggleMessagesDropdown} onMouseLeave={() => setShowMessagesDropdown(false)} style={styles.icon} />
          {showMessagesDropdown && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownItem}>Message 1</div>
              <div style={styles.dropdownItem}>Message 2</div>
              {/* Ajoutez plus d'éléments de message si nécessaire */}
            </div>
          )}
        </div>
        <div style={{ position: 'relative' }}>
          <MdPerson onClick={toggleProfileDropdown} onMouseLeave={() => setShowProfileDropdown(false)} style={styles.icon} /> [username]
          {showProfileDropdown && (
            <div style={styles.dropdown}>
              <div onClick={handleLogout} style={styles.dropdownItem}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    backgroundColor: 'white',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    right: 0,
    width: '83%',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '0 5px',
  },
  input: {
    border: 'none',
    outline: 'none',
    marginLeft: '5px',
    width: '200px',
  },
  icon: {
    color: '#888',
    fontSize: '20px',
    cursor: 'pointer',
    width: '20px',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    zIndex: 1,
    width: '200px',
  },
  dropdownItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    cursor: 'pointer',
    width: '200px',
  },
};

export default Navbar;
