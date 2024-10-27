import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from './Sidebar';

const AdminHome = () => {
  const [salesReps, setSalesReps] = useState([]);
  const [filteredReps, setFilteredReps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentRep, setCurrentRep] = useState(null);
  const navigate = useNavigate();

  // Fetch sales reps on component mount
  useEffect(() => {
    const fetchSalesReps = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/salesreps');
        setSalesReps(response.data);
        setFilteredReps(response.data);
      } catch (error) {
        console.error("Error fetching sales representatives:", error);
      }
    };
    fetchSalesReps();
  }, []);

  // Update filtered list based on search term
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredReps(
      salesReps.filter((rep) => rep.name.toLowerCase().includes(term.toLowerCase()))
    );
  };

  // Handle delete operation
  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this sales representative?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/salesreps/${id}`);
        
        // Remove deleted sales rep from both lists
        setSalesReps(salesReps.filter((rep) => rep._id !== id));
        setFilteredReps(filteredReps.filter((rep) => rep._id !== id));
        
        alert("Sales representative deleted successfully.");
      } catch (error) {
        console.error("Error deleting sales representative:", error);
        alert("Failed to delete the sales representative. Please try again.");
      }
    }
  };

  // Handle edit button click
  const handleEditClick = (rep) => {
    setEditMode(true);
    setCurrentRep(rep);
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRep = { name: currentRep.name, email: currentRep.email };
      await axios.put(`http://localhost:5000/api/auth/salesreps/${currentRep._id}`, updatedRep);
      
      // Update the local lists with the edited representative data
      setSalesReps(salesReps.map((rep) => (rep._id === currentRep._id ? currentRep : rep)));
      setFilteredReps(filteredReps.map((rep) => (rep._id === currentRep._id ? currentRep : rep)));
      
      setEditMode(false);
      alert("Sales representative updated successfully.");
    } catch (error) {
      console.error("Error updating sales representative:", error);
      alert("Failed to update the sales representative. Please try again.");
    }
  };

  return (
    <div className="home-container">
      <Sidebar isAdmin={false} />
      <div className="main-content">
        <h2>Admin Home</h2>
        <p>Welcome to the Admin Dashboard! You can manage tasks, view sales reps, and oversee work progress.</p>

        <h3>Sales Representatives List</h3>

        {/* Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name"
          style={{ padding: '8px', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }}
        />

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReps.map((rep) => (
              <tr key={rep._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{rep.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{rep.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button onClick={() => handleEditClick(rep)} style={{ marginRight: '5px' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(rep._id)} style={{ marginRight: '5px' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Modal */}
        {editMode && (
          <div className="edit-modal">
            <h3>Edit Sales Representative</h3>
            <form onSubmit={handleEditSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={currentRep.name}
                  onChange={(e) => setCurrentRep({ ...currentRep, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={currentRep.email}
                  onChange={(e) => setCurrentRep({ ...currentRep, email: e.target.value })}
                  required
                />
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
