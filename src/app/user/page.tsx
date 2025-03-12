"use client";

import { useState, useEffect } from "react";

interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  status: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "guest",
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Error loading users');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create a new user
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error('Failed to create user');
      
      // Reset form and refresh user list
      setFormData({ name: "", email: "", phone: "", status: "guest" });
      fetchUsers();
    } catch (err) {
      setError('Error creating user');
      console.error(err);
    }
  };

  // Start editing a user
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      status: user.status,
    });
  };

  // Update a user
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    
    try {
      const response = await fetch(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error('Failed to update user');
      
      // Reset form, clear editing state, and refresh user list
      setFormData({ name: "", email: "", phone: "", status: "guest" });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      setError('Error updating user');
      console.error(err);
    }
  };

  // Delete a user
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete user');
      fetchUsers();
    } catch (err) {
      setError('Error deleting user');
      console.error(err);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", phone: "", status: "guest" });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          {editingUser ? "Edit User" : "Create User"}
        </h2>
        <form onSubmit={editingUser ? handleUpdate : handleCreate} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingUser ? "Update" : "Create"}
            </button>
            
            {editingUser && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">All Users</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Phone</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border">{user.id}</td>
                    <td className="py-2 px-4 border">{user.name}</td>
                    <td className="py-2 px-4 border">{user.email}</td>
                    <td className="py-2 px-4 border">{user.phone || "-"}</td>
                    <td className="py-2 px-4 border">{user.status}</td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}
