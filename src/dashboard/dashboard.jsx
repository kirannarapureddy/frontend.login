import React, { useEffect, useState } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/members');
      const data = await response.json();
      if (response.ok) setMembers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this profile?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/auth/delete/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Deleted successfully!');
        fetchMembers(); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (member) => {
    setEditingId(member._id);
    setEditFormData({ ...member });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSaveUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });
      if (response.ok) {
        alert('Profile updated safely!');
        setEditingId(null);
        fetchMembers();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Member Portal Directory</h2>
        <button onClick={() => window.location.href = '/login'} className="logout-btn">Log Out</button>
      </div>
      <div className="table-responsive">
        <table className="member-table">
          <thead>
            <tr>
              <th>Full Name</th><th>Email</th><th>Age</th><th>Gender</th><th>Phone</th><th>City</th><th>Country</th><th>DOB</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                {editingId === member._id ? (
                  <>
                    <td>
                      <input type="text" name="firstName" value={editFormData.firstName || ''} onChange={handleEditChange} style={{width:'55px', marginRight:'4px'}} />
                      <input type="text" name="lastName" value={editFormData.lastName || ''} onChange={handleEditChange} style={{width:'55px'}} />
                    </td>
                    <td><input type="email" name="email" value={editFormData.email || ''} onChange={handleEditChange} style={{width:'110px'}} /></td>
                    <td><input type="number" name="age" value={editFormData.age || ''} onChange={handleEditChange} style={{width:'40px'}} /></td>
                    <td><input type="text" name="gender" value={editFormData.gender || ''} onChange={handleEditChange} style={{width:'50px'}} /></td>
                    <td><input type="text" name="phone" value={editFormData.phone || ''} onChange={handleEditChange} style={{width:'90px'}} /></td>
                    <td><input type="text" name="city" value={editFormData.city || ''} onChange={handleEditChange} style={{width:'70px'}} /></td>
                    <td><input type="text" name="country" value={editFormData.country || ''} onChange={handleEditChange} style={{width:'70px'}} /></td>
                    <td><input type="date" name="dob" value={editFormData.dob || ''} onChange={handleEditChange} style={{width:'110px'}} /></td>
                    <td>
                      <button className="save-btn" onClick={() => handleSaveUpdate(member._id)}>Save</button>
                      <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{member.firstName} {member.lastName}</td>
                    <td>{member.email}</td>
                    <td>{member.age}</td>
                    <td>{member.gender}</td>
                    <td>{member.phone}</td>
                    <td>{member.city || 'N/A'}</td>
                    <td>{member.country || 'N/A'}</td>
                    <td>{member.dob}</td>
                    <td>
                      <button className="edit-btn" onClick={() => startEdit(member)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(member._id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;