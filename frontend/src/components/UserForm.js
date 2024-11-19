import React, { useState, useEffect } from 'react';
import { addUser, updateUser } from '../api';

const UserForm = ({ selectedUser, setSelectedUser, setUsers }) => {
    const [user, setUser] = useState({ name: '', username: '', email: '', website: '' });
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (selectedUser) setUser(selectedUser);
    }, [selectedUser]);
  
    const validateForm = () => {
      if (!user.name || user.name.trim() === '') return 'Name is required.';
      if (!user.username || user.username.trim() === '') return 'Username is required.';
      if (!user.email || !/^\S+@\S+\.\S+$/.test(user.email)) return 'Invalid email address.';
      return null;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        return;
      }
  
      try {
        if (selectedUser) {
          const updatedUser = await updateUser(selectedUser.id, user);
          setUsers((prev) =>
            prev.map((u) => (u.id === selectedUser.id ? updatedUser : u))
          );
        } else {
          const newUser = await addUser(user);
          setUsers((prev) => [...prev, newUser]);
        }
        setUser({ name: '', username: '', email: '', website: '' });
        setSelectedUser(null);
        setError(null);
      } catch (err) {
        setError('Failed to save user');
      }
    };
  
    return (
      <div>
        <h3>{selectedUser ? 'Edit User' : 'Add User'}</h3>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Website"
            value={user.website}
            onChange={(e) => setUser({ ...user, website: e.target.value })}
          />
          <button type="submit">{selectedUser ? 'Update' : 'Add'} User</button>
        </form>
      </div>
    );
  };
  

export default UserForm;
