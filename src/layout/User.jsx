import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import { AreaTop } from "../components";

const User = () => {
  const [users, setUsers] = useState([]);
  const [deleteModal, setDeleteModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  useEffect(() => {
    fetch('http://localhost:8000/userAuth/users/role3/')
      .then(response => response.json())
      .then(data => {
        const filteredUsers = data.filter(user => user.role_id === 3);
        setUsers(filteredUsers);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Initialize the delete modal component
    setDeleteModal(new Modal(document.getElementById('deleteModal'), { backdrop: 'static', keyboard: false }));
  }, []);

  const deleteUser = (userId) => {
    fetch(`http://localhost:8000/userAuth/user-delete/${userId}/`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
      } else {
        console.error('Error deleting user:', response.status);
      }
    })
    .catch(error => console.error('Error deleting user:', error));
  };

  const openDeleteModal = (userId) => {
    setSelectedUser(userId);
    deleteModal.show();
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    deleteModal.hide();
  };

  const renderUsers = () => {
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.includes(searchTerm)
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const usersToDisplay = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    return usersToDisplay.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>
          <button className="btn btn-danger" onClick={() => openDeleteModal(user.id)}>
            <MdDelete />
          </button>
        </td>
      </tr>
    ));
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
    <AreaTop/>
    <br />
    <div style={{ textAlign: "center" }}>
      <h2>User List</h2>
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
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {[...Array(Math.ceil(users.length / usersPerPage))].map((_, i) => (
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
              <h5 className="modal-title" id="deleteModalLabel">Delete User</h5>
              <button type="button" className="btn-close" onClick={closeDeleteModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this user?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={() => { deleteUser(selectedUser); closeDeleteModal(); }}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default User;
