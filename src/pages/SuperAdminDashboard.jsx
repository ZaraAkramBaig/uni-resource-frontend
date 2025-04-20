import React, { useState } from 'react';

const SuperAdminDashboard = () => {
  const [formData, setFormData] = useState({
    institutionName: '',
    adminName: '',
    adminEmail: '',
    password: ''
  });

  const [admins, setAdmins] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAdmins([...admins, formData]);
    setFormData({ institutionName: '', adminName: '', adminEmail: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">SuperAdmin Dashboard</h1>
      
      {/* Admin Creation Form */}
      <section className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl font-bold mb-4">Create Admin Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleChange}
            placeholder="Institution Name"
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            name="adminName"
            value={formData.adminName}
            onChange={handleChange}
            placeholder="Admin Name"
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="email"
            name="adminEmail"
            value={formData.adminEmail}
            onChange={handleChange}
            placeholder="Admin Email"
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-2 border rounded-lg"
          />
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Admin</button>
        </form>
      </section>

      {/* Admin List */}
      <section className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Registered Admins</h2>
        {admins.length === 0 ? (
          <p>No admins registered yet.</p>
        ) : (
          <ul className="space-y-2">
            {admins.map((admin, index) => (
              <li key={index} className="p-4 border rounded-lg bg-gray-50">
                <p><strong>Institution:</strong> {admin.institutionName}</p>
                <p><strong>Admin:</strong> {admin.adminName}</p>
                <p><strong>Email:</strong> {admin.adminEmail}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default SuperAdminDashboard;
