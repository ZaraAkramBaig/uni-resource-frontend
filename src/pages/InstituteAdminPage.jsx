import React, { useState } from 'react';
import { 
  Users, 
  Palette, 
  School, 
  Clock, 
  Bell, 
  Settings, 
  Search, 
  PlusCircle, 
  Edit, 
  Trash, 
  Eye, 
  CheckSquare, 
  BookOpen, 
  BarChart, 
  Layout, 
  FileText, 
  Grid, 
  ChevronDown,
  Building,
  User,
  LogOut
} from 'lucide-react';

export default function InstitutionAdminDashboard() {
  // Mock data for departments and department heads
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Computer Science', head: 'Dr. Alan Turing', facultyCount: 24, studentCount: 450, createdAt: '2025-01-15' },
    { id: 2, name: 'Mathematics', head: 'Dr. Emmy Noether', facultyCount: 18, studentCount: 320, createdAt: '2025-01-20' },
    { id: 3, name: 'Physics', head: 'Dr. Richard Feynman', facultyCount: 22, studentCount: 380, createdAt: '2025-01-25' },
    { id: 4, name: 'Chemistry', head: null, facultyCount: 20, studentCount: 350, createdAt: '2025-02-01' },
    { id: 5, name: 'Biology', head: 'Dr. Rosalind Franklin', facultyCount: 19, studentCount: 410, createdAt: '2025-02-05' }
  ]);

  // Institution details
  const [institution, setInstitution] = useState({
    name: 'Cambridge University',
    logo: '/api/placeholder/80/80',
    foundedYear: 1209,
    address: 'Cambridge CB2 1TN, United Kingdom',
    website: 'www.cam.ac.uk',
    adminEmail: 'admin@cam.ac.uk',
    adminPhone: '+44 1223 337733'
  });

  // Theme settings
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#1E40AF', // Cambridge blue
    secondaryColor: '#831843',
    fontFamily: 'Georgia',
    logo: '/api/placeholder/120/120',
    showDepartmentColors: true,
    enableDarkMode: false,
    customCSS: '/* Custom CSS styles */\n.header {\n  border-bottom: 2px solid #1E40AF;\n}'
  });

  // State for tabs and forms
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showThemeEditor, setShowThemeEditor] = useState(false);
  const [showNewDeptHeadForm, setShowNewDeptHeadForm] = useState(false);
  const [showInstitutionModal, setShowInstitutionModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  
  const [newDeptHead, setNewDeptHead] = useState({
    departmentId: '',
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  // Handle form submission for new department head
  const handleNewDeptHeadSubmit = (e) => {
    e.preventDefault();
    // Logic to create new department head would go here
    // For demo purposes, we'll just close the form and update the department
    const updatedDepartments = departments.map(dept => 
      dept.id.toString() === newDeptHead.departmentId 
        ? { ...dept, head: newDeptHead.name } 
        : dept
    );
    
    setDepartments(updatedDepartments);
    setShowNewDeptHeadForm(false);
    setNewDeptHead({
      departmentId: '',
      name: '',
      email: '',
      phone: '',
      password: ''
    });
    alert("New department head account created successfully!");
  };

  // Handle theme settings update
  const handleThemeUpdate = (e) => {
    e.preventDefault();
    // Logic to update theme settings would go here
    setShowThemeEditor(false);
    alert("Theme updated successfully! Changes will be reflected throughout the institution's portal.");
  };

  // Analytics data
  const analyticsData = {
    totalDepartments: departments.length,
    totalFaculty: departments.reduce((sum, dept) => sum + dept.facultyCount, 0),
    totalStudents: departments.reduce((sum, dept) => sum + dept.studentCount, 0),
    pendingScheduleRequests: 8
  };

  // Color presets for theme selection
  const colorPresets = [
    { name: 'Cambridge Blue', primary: '#1E40AF', secondary: '#831843' },
    { name: 'Oxford Blue', primary: '#1E3A8A', secondary: '#9D174D' },
    { name: 'Harvard Crimson', primary: '#991B1B', secondary: '#1E40AF' },
    { name: 'Stanford Cardinal', primary: '#9F1239', secondary: '#374151' },
    { name: 'Yale Blue', primary: '#1E3A8A', secondary: '#B91C1C' },
    { name: 'MIT Gray', primary: '#4B5563', secondary: '#DC2626' }
  ];

  // Department Head Modal
  const DepartmentHeadModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color: themeSettings.primaryColor }}>
            {selectedDepartment 
              ? `Add Department Head for ${selectedDepartment.name}` 
              : "Add New Department Head"}
          </h2>
          <button 
            onClick={() => setShowNewDeptHeadForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleNewDeptHeadSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Department</label>
            <select 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              style={{ focusRing: themeSettings.primaryColor }}
              value={newDeptHead.departmentId}
              onChange={(e) => setNewDeptHead({...newDeptHead, departmentId: e.target.value})}
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id.toString()}>
                  {dept.name} {dept.head ? '(Replace Head)' : '(No Head Assigned)'}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              value={newDeptHead.name}
              onChange={(e) => setNewDeptHead({...newDeptHead, name: e.target.value})}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              value={newDeptHead.email}
              onChange={(e) => setNewDeptHead({...newDeptHead, email: e.target.value})}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
            <input 
              type="tel" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              value={newDeptHead.phone}
              onChange={(e) => setNewDeptHead({...newDeptHead, phone: e.target.value})}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Temporary Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              value={newDeptHead.password}
              onChange={(e) => setNewDeptHead({...newDeptHead, password: e.target.value})}
              required
            />
            <p className="text-xs text-gray-500 mt-1">Department head will be prompted to change on first login</p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowNewDeptHeadForm(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded"
              style={{ backgroundColor: themeSettings.primaryColor }}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Institution Modal
  const InstitutionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color: themeSettings.primaryColor }}>
            Add New Institution
          </h2>
          <button 
            onClick={() => setShowInstitutionModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          setShowInstitutionModal(false);
          alert("Institution added successfully!");
        }}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Institution Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Founded Year</label>
            <input 
              type="number" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Website</label>
            <input 
              type="url" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Admin Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Admin Phone</label>
            <input 
              type="tel" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Logo Upload</label>
            <div className="flex items-center">
              <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                <School size={24} />
              </div>
              <label className="ml-3 px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300">
                Choose File
                <input type="file" className="hidden" />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">Recommended size: 120x120px. PNG or SVG format.</p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowInstitutionModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded"
              style={{ backgroundColor: themeSettings.primaryColor }}
            >
              Create Institution
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Theme Editor Modal
  const ThemeEditorModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="border-b px-6 py-4 sticky top-0 bg-white z-10" style={{ borderColor: themeSettings.primaryColor }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold" style={{ color: themeSettings.primaryColor }}>Customize Institution Theme</h2>
            <button 
              onClick={() => setShowThemeEditor(false)}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <form onSubmit={handleThemeUpdate} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Colors & Branding</h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Primary Color
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={themeSettings.primaryColor}
                    onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
                    className="w-10 h-10 rounded border p-1"
                  />
                  <input
                    type="text"
                    value={themeSettings.primaryColor}
                    onChange={(e) => setThemeSettings({...themeSettings, primaryColor: e.target.value})}
                    className="ml-2 px-3 py-2 border rounded w-28"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={themeSettings.secondaryColor}
                    onChange={(e) => setThemeSettings({...themeSettings, secondaryColor: e.target.value})}
                    className="w-10 h-10 rounded border p-1"
                  />
                  <input
                    type="text"
                    value={themeSettings.secondaryColor}
                    onChange={(e) => setThemeSettings({...themeSettings, secondaryColor: e.target.value})}
                    className="ml-2 px-3 py-2 border rounded w-28"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Font Family
                </label>
                <select
                  value={themeSettings.fontFamily}
                  onChange={(e) => setThemeSettings({...themeSettings, fontFamily: e.target.value})}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Helvetica, sans-serif">Helvetica</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                  <option value="'Courier New', monospace">Courier New</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Logo Upload
                </label>
                <div className="flex items-center">
                  <img src={themeSettings.logo} alt="Logo preview" className="w-16 h-16 rounded bg-gray-100" />
                  <label className="ml-3 px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300">
                    Choose File
                    <input type="file" className="hidden" />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">Recommended size: 120x120px. PNG or SVG format.</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Theme Options</h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Preset Color Schemes
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setThemeSettings({
                        ...themeSettings,
                        primaryColor: preset.primary,
                        secondaryColor: preset.secondary
                      })}
                      className="p-2 border rounded text-xs text-center hover:border-blue-500"
                    >
                      <div className="flex justify-center space-x-1 mb-1">
                        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: preset.primary }}></div>
                        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: preset.secondary }}></div>
                      </div>
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={themeSettings.showDepartmentColors}
                    onChange={(e) => setThemeSettings({...themeSettings, showDepartmentColors: e.target.checked})}
                    className="h-4 w-4 mr-2"
                  />
                  <span className="text-gray-700">Enable department color coding</span>
                </label>
                <p className="text-xs text-gray-500 ml-6">Departments will have their own color identifiers</p>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={themeSettings.enableDarkMode}
                    onChange={(e) => setThemeSettings({...themeSettings, enableDarkMode: e.target.checked})}
                    className="h-4 w-4 mr-2"
                  />
                  <span className="text-gray-700">Enable dark mode option</span>
                </label>
                <p className="text-xs text-gray-500 ml-6">Allow users to toggle dark mode in their interface</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Custom CSS
                </label>
                <textarea
                  value={themeSettings.customCSS}
                  onChange={(e) => setThemeSettings({...themeSettings, customCSS: e.target.value})}
                  className="w-full px-3 py-2 border rounded font-mono text-sm"
                  rows={5}
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Add custom CSS to fine-tune your institution's appearance</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 -mx-6 -mb-6 px-6 py-4 flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowThemeEditor(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded"
              style={{ backgroundColor: themeSettings.primaryColor }}
            >
              Save Theme
            </button>
          </div>
        </form>
      </div>
    </div>
  );

//   // Render the main dashboard content based on active tab
//   const renderContent = () => {
//     switch(activeTab) {
//       case 'dashboard':
//         return (
//           <main className="px-6 py-8">
//             {/* Institution Info Card */}
//             <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border-t-4" style={{ borderTopColor: themeSettings.primaryColor }}>
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center">
//                   <img src={institution.logo} alt={institution.name} className="w-16 h-16 mr-6 rounded" />
//                   <div>
//                     <h2 className="text-2xl font-bold mb-2">{institution.name}</h2>
//                     <div className="text-sm text-gray-600">
//                       <p>Founded: {institution.foundedYear}</p>
//                       <p>Address: {institution.address}</p>
//                       <p>Website: {institution.website}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <button className="text-gray-400 hover:text-gray-600">
//                   <Edit size={20} />
//                 </button>
//               </div>
//             </div>

//             {/* Analytics Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: themeSettings.primaryColor }}>
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-gray-500 text-sm font-medium">Total Departments</h3>
//                   <School style={{ color: themeSettings.primaryColor }} size={24} />
//                 </div>
//                 <p className="text-3xl font-bold text-gray-800 mt-2">{analyticsData.totalDepartments}</p>
//                 <p className="text-gray-500 text-sm mt-2">All active departments</p>
//               </div>
//               <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: themeSettings.secondaryColor }}>
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-gray-500 text-sm font-medium">Total Faculty</h3>
//                   <Users style={{ color: themeSettings.secondaryColor }} size={24} />
//                 </div>
//                 <p className="text-3xl font-bold text-gray-800 mt-2">{analyticsData.totalFaculty}</p>
//                 <p className="text-gray-500 text-sm mt-2">Professors and assistants</p>
//               </div>
//               <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: themeSettings.primaryColor }}>
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
//                   <Users style={{ color: themeSettings.primaryColor }} size={24} />
//                 </div>
//                 <p className="text-3xl font-bold text-gray-800 mt-2">{analyticsData.totalStudents}</p>
//                 <p className="text-gray-500 text-sm mt-2">Enrolled students</p>
//               </div>
//               <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: themeSettings.secondaryColor }}>
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-gray-500 text-sm font-medium">Schedule Requests</h3>
//                   <Bell style={{ color: themeSettings.secondaryColor }} size={24} />
//                 </div>
//                 <p className="text-3xl font-bold text-gray-800 mt-2">{analyticsData.pendingScheduleRequests}</p>
//                 <p className="text-orange-500 text-sm mt-2">Requires attention</p>
//               </div>
//             </div>

//             {/* Theme Preview */}
//             <div className="bg-white rounded-lg shadow-sm mb-8">
//               <div className="border-b px-6 py-4 flex items-center justify-between">
//                 <h2 className="text-lg font-semibold" style={{ color: themeSettings.primaryColor }}>Current Theme Preview</h2>
//                 <button 
//                   onClick={() => setShowThemeEditor(true)}
//                   className="text-sm px-3 py-1 rounded flex items-center text-white"
//                   style={{ backgroundColor: themeSettings.primaryColor }}
//                 >
//                   <Edit size={14} className="mr-1" />
//                   Edit Theme
//                 </button>
//               </div>
//               <div className="p-6">
//                 <div className="flex flex-wrap gap-6">
//                   <div className="flex-1 min-w-fit">
//                     <h3 className="text-sm font-medium text-gray-500 mb-2">Color Palette</h3>
//                     <div className="flex space-x-3">
//                       <div className="flex flex-col items-center">
//                         <div className="w-16 h-16 rounded shadow-sm" style={{ backgroundColor: themeSettings.primaryColor }}></div>
//                         <span className="text-xs mt-1">Primary</span>
//                       </div>
//                       <div className="flex flex-col items-center">
//                         <div className="w-16 h-16 rounded shadow-sm" style={{ backgroundColor: themeSettings.secondaryColor }}></div>
//                         <span className="text-xs mt-1">Secondary</span>
//                       </div>
//                       <div className="flex flex-col items-center">
//                         <div className="w-16 h-16 rounded shadow-sm bg-white border"></div>
//                         <span className="text-xs mt-1">Background</span>
//                       </div>
//                       <div className="flex flex-col items-center">
//                         <div className="w-16 h-16 rounded shadow-sm bg-gray-800"></div>
//                         <span className="text-xs mt-1">Text</span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex-1 min-w-fit">
//                     <h3 className="text-sm font-medium text-gray-500 mb-2">Typography</h3>
//                     <div className="space-y-2">
//                       <div style={{ fontFamily: themeSettings.fontFamily }}>
//                         <p className="text-xl font-bold">Heading Example</p>
//                         <p className="text-sm">This is an example of your selected font: {themeSettings.fontFamily}</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex-1 min-w-fit">
//                     <h3 className="text-sm font-medium text-gray-500 mb-2">UI Elements</h3>
//                     <div className="space-y-2">
//                       <button 
//                         className="px-3 py-1 rounded text-white text-sm"
//                         style={{ backgroundColor: themeSettings.primaryColor }}
//                       >
//                         Primary Button
//                       </button>
//                       <button 
//                         className="px-3 py-1 rounded text-white text-sm ml-2"
//                         style={{ backgroundColor: themeSettings.secondaryColor }}
}