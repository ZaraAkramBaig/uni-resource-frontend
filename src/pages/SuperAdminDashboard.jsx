import React, { useEffect, useState } from 'react';
import { PlusCircle, Users, School, Clock, Bell, Settings, Search, Eye, Check, X, AlertTriangle, BookOpen } from 'lucide-react';
import { fetchAPI } from '../utils/fetchAPI';
const SuperAdminDashboard = () => {

  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    // Fetch institutions and pending requests from API

    fetchAPI('http://127.0.0.1:5000/api/institution', 'GET').then(data => {
      console.log(data);
      setInstitutions(data);
    }).catch(error => {
      console.error('Error fetching institutions:', error);
    });

  }, []);

  // State for forms
  const pendingRequests = institutions.filter(institution => institution.active === false);
  const activeInstitutions = institutions.filter(institution => institution.active === true);

  const [showNewAdminForm, setShowNewAdminForm] = useState([false, null]);
  const [newAdmin, setNewAdmin] = useState({});
  // Analytics data
  const analyticsData = {
    totalInstitutions: institutions.length,
    activeInstitutions: activeInstitutions.length,
    pendingRequests: pendingRequests.length
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleNewAdminSubmit = async(e) => {
    try {
      e.preventDefault();
      console.log('New admin data:', newAdmin);
      let institutionId = showNewAdminForm[1];
      const response = await fetchAPI(`http://127.0.0.1:5000/api/institution/${institutionId}/approve`, 'POST', {active: true})
      console.log('Response:', response);
      const adminResponse = await fetchAPI(`http://127.0.0.1:5000/api/institution/${institutionId}/admin/register`, `POST`, newAdmin);
      console.log('Admin Response:', adminResponse);
    }
    catch (error) {
        console.error('Error creating new admin:', error);
        alert("Error creating new admin account. Please try again.");
    }
    setShowNewAdminForm(false);
    setNewAdmin({
      institutionName: '',
      adminName: '',
      adminEmail: '',
      adminPhone: '',
      adminPassword: ''
    });
    alert("New admin account created successfully!");
  };

  //Handle request rejection
  const handleRejectRequest = (requestId) => {

    fetchAPI(`http://127.0.0.1:5000/api/institution/${requestId}`, 'DELETE').then(data => {

      setInstitutions((prevInstitutions) => prevInstitutions.filter((institution) => institution.id !== requestId));
    }).catch(error => {
      console.error('Error fetching institutions:', error);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">EduScheduler</h1>
          <p className="text-indigo-200 text-sm">Super Admin Panel</p>
        </div>
        <nav className="mt-6">
          <div className="px-4 py-3 bg-indigo-900 flex items-center text-indigo-100">
            <Users className="mr-3" size={20} />
            <span>Institutions</span>
          </div>
          <a href="#" className="px-4 py-3 flex items-center text-indigo-200 hover:bg-indigo-700">
            <Bell className="mr-3" size={20} />
            <span>Requests</span>
          </a>
          <a href="#" className="px-4 py-3 flex items-center text-indigo-200 hover:bg-indigo-700">
            <Clock className="mr-3" size={20} />
            <span>Activity Logs</span>
          </a>
          <a href="#" className="px-4 py-3 flex items-center text-indigo-200 hover:bg-indigo-700">
            <Settings className="mr-3" size={20} />
            <span>System Settings</span>
          </a>
          <a href="#" className="px-4 py-3 flex items-center text-indigo-200 hover:bg-indigo-700">
            <BookOpen className="mr-3" size={20} />
            <span>Documentation</span>
          </a>
        </nav>
        <div className="absolute bottom-0 left-0 w-64 p-4 bg-indigo-900">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              SA
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Super Admin</p>
              <p className="text-xs text-indigo-300">admin@eduscheduler.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            
          </div>
        </header>

        <main className="px-6 py-8">
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm font-medium">Total Institutions</h3>
                <School className="text-indigo-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-800 mt-2">{analyticsData.totalInstitutions}</p>
              <p className="text-green-500 text-sm mt-2">{analyticsData.activeInstitutions} active</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm font-medium">Pending Requests</h3>
                <Bell className="text-indigo-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-gray-800 mt-2">{analyticsData.pendingRequests}</p>
              <p className="text-orange-500 text-sm mt-2">Requires attention</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm font-medium">System Status</h3>
                <div className="h-4 w-4 rounded-full bg-green-500"></div>
              </div>
              <p className="text-3xl font-bold text-gray-800 mt-2">Operational</p>
              <p className="text-gray-500 text-sm mt-2">All services running</p>
            </div>
          </div>

          {/* Pending Requests Section */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Pending Institution Requests</h2>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {pendingRequests.length} pending
              </span>
            </div>
            <div className="overflow-x-auto">
              {pendingRequests.length > 0 ? (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{request.name}</div>
                          <div className="text-sm text-gray-500">ID: #{request.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{request.official_email}</div>
                          <div className="text-sm text-gray-500">{request.phone_number}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.created_at}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => setShowNewAdminForm([true, request.id])}
                              className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-100">
                              <Check size={18} />
                            </button>
                            <button 
                              onClick={() => handleRejectRequest(request.id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100">
                              <X size={18} />
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100">
                              <Eye size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-gray-500">No pending requests</div>
              )}
            </div>
          </div>

          {/* Registered Institutions */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Registered Institutions</h2>
              <div className="relative">
                <input type="text" onChange={(e)=> {
                  const searchValue = e.target.value.toLowerCase();
                  const filteredInstitutions = institutions.filter(institution => institution.name.toLowerCase().startsWith(searchValue));
                  console.log(filteredInstitutions);
                  setInstitutions(filteredInstitutions);
                }} placeholder="Filter institutions..." className="px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>
            <div className="overflow-x-auto">
              { activeInstitutions.length > 0 ? (<table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeInstitutions.map((institution) => (
                    <tr key={institution.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{institution.name}</div>
                        <div className="text-sm text-gray-500">ID: #{institution.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {institution.admin.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {institution.created_at}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-medium  bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      
                    </tr>
                  ))}  
                </tbody>
              </table>) : (<p className='text-center py-8'>No Institutions Registered</p>)}
            </div>
              <div className="px-6 py-4 text-sm text-gray-500">
                Showing {institutions.length} institutions
              </div>
          </div>
        </main>
      </div>

      {/* New Admin Modal */}
      {showNewAdminForm[0] && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Add New Institution Admin</h2>
              <button 
                onClick={() => setShowNewAdminForm([false, null])}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleNewAdminSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="institutionName">
                  Institution Name
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adminName">
                  Admin's Full Name
                </label>
                <input
                name='full_name'
                  type="text"
                  id="adminName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter admin name"
                  value={newAdmin.adminName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adminEmail">
                  Admin Email
                </label>
                <input
                name='email'
                  type="email"
                  id="adminEmail"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter admin email"
                  value={newAdmin.adminEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adminPhone">
                  Admin Phone
                </label>
                <input
                name='phone'
                  type="tel"
                  id="adminPhone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter admin phone"
                  value={newAdmin.adminPhone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adminPassword">
                  Initial Password
                </label>
                <input
                name="password"
                  type="password"
                  id="adminPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Set initial password"
                  value={newAdmin.adminPassword}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Admin will be prompted to change password on first login</p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewAdminForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNewAdminSubmit}
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Create Admin Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;