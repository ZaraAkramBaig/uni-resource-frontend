// import React, { useState } from 'react';
// import { Users, Layout, Sliders, Bell, Settings, Search, PlusCircle, Shield, BookOpen, Grid, Eye, Edit, Trash, CheckSquare, Clock, Calendar, User, Book, AlertCircle, LogOut } from 'lucide-react';

// const InstitutionAdminDashboard = () => {
//   // State for theme customization
//   const [themeColors, setThemeColors] = useState({
//     primary: '#4f46e5', // Default indigo
//     secondary: '#0ea5e9', // Default sky blue
//     accent: '#8b5cf6', // Default purple
//     bgColor: '#f9fafb', // Default gray-50
//     headerColor: '#ffffff', // Default white
//     sidebarColor: '#1e293b', // Default slate-800
//     textColor: '#1f2937', // Default gray-800
//   });

//   // State for department heads
//   const [departmentHeads, setDepartmentHeads] = useState([
//     { id: 1, name: 'Dr. Emma Richardson', department: 'Computer Science', email: 'e.richardson@harvard.edu', status: 'active', lastActive: '2025-04-22' },
//     { id: 2, name: 'Prof. James Wilson', department: 'Mathematics', email: 'j.wilson@harvard.edu', status: 'active', lastActive: '2025-04-21' },
//     { id: 3, name: 'Dr. Sarah Johnson', department: 'Physics', email: 's.johnson@harvard.edu', status: 'active', lastActive: '2025-04-18' },
//     { id: 4, name: 'Prof. Michael Chen', department: 'Chemistry', email: 'm.chen@harvard.edu', status: 'inactive', lastActive: '2025-04-15' },
//     { id: 5, name: 'Dr. Lisa Anderson', department: 'Biology', email: 'l.anderson@harvard.edu', status: 'active', lastActive: '2025-04-20' },
//   ]);
  
//   // State for departments
//   const [departments, setDepartments] = useState([
//     { id: 1, name: 'Computer Science', students: 450, teachers: 32, classes: 28, labs: 8 },
//     { id: 2, name: 'Mathematics', students: 380, teachers: 25, classes: 22, labs: 4 },
//     { id: 3, name: 'Physics', students: 320, teachers: 28, classes: 24, labs: 10 },
//     { id: 4, name: 'Chemistry', students: 290, teachers: 22, classes: 18, labs: 12 },
//     { id: 5, name: 'Biology', students: 340, teachers: 26, classes: 20, labs: 8 },
//   ]);

//   // State for modals
//   const [showThemeModal, setShowThemeModal] = useState(false);
//   const [showNewDeptHeadModal, setShowNewDeptHeadModal] = useState(false);
//   const [showNewDepartmentModal, setShowNewDepartmentModal] = useState(false);

//   // State for new department head form
//   const [newDeptHead, setNewDeptHead] = useState({
//     name: '',
//     department: '',
//     email: '',
//     phone: '',
//     password: ''
//   });

//   // State for new department form
//   const [newDepartment, setNewDepartment] = useState({
//     name: '',
//     description: ''
//   });

//   // Apply theme to root element
//   React.useEffect(() => {
//     document.documentElement.style.setProperty('--color-primary', themeColors.primary);
//     document.documentElement.style.setProperty('--color-secondary', themeColors.secondary);
//     document.documentElement.style.setProperty('--color-accent', themeColors.accent);
//     document.documentElement.style.setProperty('--color-bg', themeColors.bgColor);
//     document.documentElement.style.setProperty('--color-header', themeColors.headerColor);
//     document.documentElement.style.setProperty('--color-sidebar', themeColors.sidebarColor);
//     document.documentElement.style.setProperty('--color-text', themeColors.textColor);
//   }, [themeColors]);

//   // Handle theme color change
//   const handleColorChange = (colorKey, value) => {
//     setThemeColors({
//       ...themeColors,
//       [colorKey]: value
//     });
//   };

//   // Handle new department head submission
//   const handleNewDeptHeadSubmit = (e) => {
//     e.preventDefault();
//     // In real application, this would send data to backend
//     const newHead = {
//       id: departmentHeads.length + 1,
//       name: newDeptHead.name,
//       department: newDeptHead.department,
//       email: newDeptHead.email,
//       status: 'active',
//       lastActive: new Date().toISOString().split('T')[0]
//     };
    
//     setDepartmentHeads([...departmentHeads, newHead]);
//     setShowNewDeptHeadModal(false);
//     setNewDeptHead({
//       name: '',
//       department: '',
//       email: '',
//       phone: '',
//       password: ''
//     });
//     alert("Department head account created successfully!");
//   };

//   // Handle new department submission
//   const handleNewDepartmentSubmit = (e) => {
//     e.preventDefault();
//     // In real application, this would send data to backend
//     const newDept = {
//       id: departments.length + 1,
//       name: newDepartment.name,
//       students: 0,
//       teachers: 0,
//       classes: 0,
//       labs: 0
//     };
    
//     setDepartments([...departments, newDept]);
//     setShowNewDepartmentModal(false);
//     setNewDepartment({
//       name: '',
//       description: ''
//     });
//     alert("Department created successfully!");
//   };

//   // Analytics data
//   const analyticsData = {
//     totalDepartments: departments.length,
//     totalDeptHeads: departmentHeads.length,
//     totalStudents: departments.reduce((sum, dept) => sum + dept.students, 0),
//     totalTeachers: departments.reduce((sum, dept) => sum + dept.teachers, 0),
//     totalClasses: departments.reduce((sum, dept) => sum + dept.classes, 0),
//     totalLabs: departments.reduce((sum, dept) => sum + dept.labs, 0)
//   };

//   // CSS Variables for dynamic theme
//   const themeStyle = {
//     '--color-primary': themeColors.primary,
//     '--color-secondary': themeColors.secondary,
//     '--color-accent': themeColors.accent,
//     '--color-bg': themeColors.bgColor,
//     '--color-header': themeColors.headerColor,
//     '--color-sidebar': themeColors.sidebarColor,
//     '--color-text': themeColors.textColor,
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100" style={themeStyle}>
//       {/* Sidebar */}
//       <div className="w-64" style={{backgroundColor: themeColors.sidebarColor}}>
//         <div className="p-6">
//           <h1 className="text-2xl font-bold text-white">Harvard University</h1>
//           <p className="text-gray-400 text-sm">Admin Dashboard</p>
//         </div>
//         <nav className="mt-6">
//           <div className="px-4 py-3 flex items-center text-white bg-opacity-20 bg-black">
//             <Grid className="mr-3" size={20} />
//             <span>Dashboard</span>
//           </div>
//           <a href="#" className="px-4 py-3 flex items-center text-gray-300 hover:bg-black hover:bg-opacity-10">
//             <Users className="mr-3" size={20} />
//             <span>Department Heads</span>
//           </a>
//           <a href="#" className="px-4 py-3 flex items-center text-gray-300 hover:bg-black hover:bg-opacity-10">
//             <BookOpen className="mr-3" size={20} />
//             <span>Departments</span>
//           </a>
//           <a href="#" className="px-4 py-3 flex items-center text-gray-300 hover:bg-black hover:bg-opacity-10">
//             <Calendar className="mr-3" size={20} />
//             <span>Schedules</span>
//           </a>
//           <a href="#" className="px-4 py-3 flex items-center text-gray-300 hover:bg-black hover:bg-opacity-10">
//             <Clock className="mr-3" size={20} />
//             <span>Activity Logs</span>
//           </a>
//           <a href="#" 
//             className="px-4 py-3 flex items-center text-gray-300 hover:bg-black hover:bg-opacity-10"
//             onClick={() => setShowThemeModal(true)}
//           >
//             <Layout className="mr-3" size={20} />
//             <span>Theme Customization</span>
//           </a>
//           <a href="#" className="px-4 py-3 flex items-center text-gray-300 hover:bg-black hover:bg-opacity-10">
//             <Settings className="mr-3" size={20} />
//             <span>Institution Settings</span>
//           </a>
//         </nav>
//         <div className="absolute bottom-0 left-0 w-64 p-4" style={{backgroundColor: `${themeColors.sidebarColor}`}}>
//           <div className="flex items-center">
//             <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
//               IA
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium text-white">John Smith</p>
//               <p className="text-xs text-gray-400">Institution Admin</p>
//             </div>
//           </div>
//           <div className="mt-3 pt-3 border-t border-gray-700">
//             <a href="#" className="flex items-center text-gray-400 hover:text-white text-sm">
//               <LogOut className="mr-2" size={16} />
//               <span>Sign Out</span>
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="shadow-sm z-10" style={{backgroundColor: themeColors.headerColor}}>
//           <div className="px-6 py-4 flex items-center justify-between">
//             <div className="flex items-center">
//               <h1 className="text-xl font-semibold" style={{color: themeColors.textColor}}>
//                 Institution Dashboard
//               </h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <input type="text" placeholder="Search..." className="px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50" 
//                   style={{borderColor: themeColors.primary, "--tw-ring-color": themeColors.primary}} />
//                 <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//               </div>
//               <button className="p-2 relative text-gray-500 hover:text-gray-700">
//                 <Bell size={20} />
//                 <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
//               </button>
//               <button 
//                 className="px-4 py-2 rounded-lg text-white flex items-center"
//                 style={{backgroundColor: themeColors.primary}}
//                 onClick={() => setShowThemeModal(true)}
//               >
//                 <Sliders className="mr-2" size={16} />
//                 Customize Theme
//               </button>
//             </div>
//           </div>
//         </header>

//         <main className="flex-1 overflow-y-auto p-6" style={{backgroundColor: themeColors.bgColor}}>
//           {/* Analytics Cards */}
//           <div className="grid grid-cols-3 gap-6 mb-8">
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-medium text-gray-700">Departments</h3>
//                 <div className="p-2 rounded-full" style={{backgroundColor: `${themeColors.primary}10`}}>
//                   <BookOpen style={{color: themeColors.primary}} size={20} />
//                 </div>
//               </div>
//               <div className="flex items-end justify-between">
//                 <div>
//                   <p className="text-3xl font-bold" style={{color: themeColors.textColor}}>{analyticsData.totalDepartments}</p>
//                   <div className="flex items-center mt-2">
//                     <button 
//                       className="text-sm flex items-center" 
//                       style={{color: themeColors.primary}}
//                       onClick={() => setShowNewDepartmentModal(true)}
//                     >
//                       <PlusCircle size={16} className="mr-1" />
//                       Add Department
//                     </button>
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-end">
//                   <span className="text-sm text-gray-500">{analyticsData.totalClasses} Classes</span>
//                   <span className="text-sm text-gray-500">{analyticsData.totalLabs} Labs</span>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-medium text-gray-700">Department Heads</h3>
//                 <div className="p-2 rounded-full" style={{backgroundColor: `${themeColors.secondary}10`}}>
//                   <Shield style={{color: themeColors.secondary}} size={20} />
//                 </div>
//               </div>
//               <div className="flex items-end justify-between">
//                 <div>
//                   <p className="text-3xl font-bold" style={{color: themeColors.textColor}}>{analyticsData.totalDeptHeads}</p>
//                   <div className="flex items-center mt-2">
//                     <button 
//                       className="text-sm flex items-center" 
//                       style={{color: themeColors.secondary}}
//                       onClick={() => setShowNewDeptHeadModal(true)}
//                     >
//                       <PlusCircle size={16} className="mr-1" />
//                       Add Department Head
//                     </button>
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-end">
//                   <span className="text-sm text-gray-500">{departmentHeads.filter(head => head.status === 'active').length} Active</span>
//                   <span className="text-sm text-gray-500">{departmentHeads.filter(head => head.status === 'inactive').length} Inactive</span>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
//                 <div className="p-2 rounded-full" style={{backgroundColor: `${themeColors.accent}10`}}>
//                   <Users style={{color: themeColors.accent}} size={20} />
//                 </div>
//               </div>
//               <div className="flex items-end justify-between">
//                 <div>
//                   <p className="text-3xl font-bold" style={{color: themeColors.textColor}}>
//                     {analyticsData.totalStudents + analyticsData.totalTeachers + analyticsData.totalDeptHeads}
//                   </p>
//                 </div>
//                 <div className="flex flex-col items-end">
//                   <span className="text-sm text-gray-500">{analyticsData.totalStudents} Students</span>
//                   <span className="text-sm text-gray-500">{analyticsData.totalTeachers} Teachers</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Department Heads Section */}
//           <div className="bg-white rounded-lg shadow mb-8">
//             <div className="border-b px-6 py-4 flex items-center justify-between">
//               <h2 className="text-lg font-semibold text-gray-800">Department Heads</h2>
//               <button 
//                 className="px-4 py-2 rounded-lg text-white flex items-center text-sm"
//                 style={{backgroundColor: themeColors.primary}}
//                 onClick={() => setShowNewDeptHeadModal(true)}
//               >
//                 <PlusCircle size={16} className="mr-2" />
//                 Add Department Head
//               </button>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {departmentHeads.map((head) => (
//                     <tr key={head.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
//                             <User size={20} className="text-gray-500" />
//                           </div>
//                           <div className="ml-4">
//                             <div className="font-medium text-gray-900">{head.name}</div>
//                             <div className="text-sm text-gray-500">ID: #{head.id}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{head.department}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{head.email}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                           head.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                         }`}>
//                           {head.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {head.lastActive}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <div className="flex justify-end space-x-2">
//                           <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100">
//                             <Eye size={18} />
//                           </button>
//                           <button className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100">
//                             <Edit size={18} />
//                           </button>
//                           <button className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100">
//                             <Trash size={18} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Departments Section */}
//           <div className="bg-white rounded-lg shadow">
//             <div className="border-b px-6 py-4 flex items-center justify-between">
//               <h2 className="text-lg font-semibold text-gray-800">Departments</h2>
//               <button 
//                 className="px-4 py-2 rounded-lg text-white flex items-center text-sm"
//                 style={{backgroundColor: themeColors.secondary}}
//                 onClick={() => setShowNewDepartmentModal(true)}
//               >
//                 <PlusCircle size={16} className="mr-2" />
//                 Add Department
//               </button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//               {departments.map((dept) => (
//                 <div key={dept.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
//                   <div className="flex justify-between items-start mb-4">
//                     <h3 className="text-lg font-medium text-gray-800">{dept.name}</h3>
//                     <div className="flex space-x-1">
//                       <button className="text-gray-500 hover:text-gray-700 p-1">
//                         <Edit size={16} />
//                       </button>
//                       <button className="text-gray-500 hover:text-red-600 p-1">
//                         <Trash size={16} />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3 text-sm">
//                     <div className="flex items-center">
//                       <User className="mr-2 text-gray-400" size={16} />
//                       <span className="text-gray-600">{dept.students} Students</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Users className="mr-2 text-gray-400" size={16} />
//                       <span className="text-gray-600">{dept.teachers} Teachers</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Book className="mr-2 text-gray-400" size={16} />
//                       <span className="text-gray-600">{dept.classes} Classes</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Layout className="mr-2 text-gray-400" size={16} />
//                       <span className="text-gray-600">{dept.labs} Labs</span>
//                     </div>
//                   </div>
//                   <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
//                     <button 
//                       className="text-sm text-white px-3 py-1 rounded"
//                       style={{backgroundColor: themeColors.primary}}
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Theme Customization Modal */}
//       {showThemeModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
//             <div className="border-b px-6 py-4 flex items-center justify-between">
//               <h2 className="text-lg font-semibold text-gray-800">Customize Institution Theme</h2>
//               <button 
//                 onClick={() => setShowThemeModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <Sliders size={20} />
//               </button>
//             </div>
//             <div className="p-6">
//               <div className="mb-6">
//                 <h3 className="text-md font-medium text-gray-700 mb-4">Theme Preview</h3>
//                 <div className="p-4 rounded-lg border mb-4" style={{backgroundColor: themeColors.bgColor}}>
//                   <div className="h-8 w-full mb-3 rounded" style={{backgroundColor: themeColors.headerColor}}></div>
//                   <div className="flex">
//                     <div className="h-24 w-16 rounded" style={{backgroundColor: themeColors.sidebarColor}}></div>
//                     <div className="ml-3 flex-1">
//                       <div className="h-4 w-full rounded mb-2" style={{backgroundColor: themeColors.primary}}></div>
//                       <div className="h-4 w-3/4 rounded mb-2" style={{backgroundColor: themeColors.secondary}}></div>
//                       <div className="h-4 w-1/2 rounded" style={{backgroundColor: themeColors.accent}}></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Primary Color
//                 </label>
//                 <div className="flex items-center">
//                   <input 
//                     type="color" 
//                     value={themeColors.primary} 
//                     onChange={(e) => handleColorChange('primary', e.target.value)}
//                     className="w-12 h-10 border-none rounded"
//                   />
//                   <input 
//                     type="text" 
//                     value={themeColors.primary} 
//                     onChange={(e) => handleColorChange('primary', e.target.value)}
//                     className="ml-3 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Secondary Color
//                 </label>
//                 <div className="flex items-center">
//                   <input 
//                     type="color" 
//                     value={themeColors.secondary} 
//                     onChange={(e) => handleColorChange('secondary', e.target.value)}
//                     className="w-12 h-10 border-none rounded"
//                   />
//                   <input 
//                     type="text" 
//                     value={themeColors.secondary} 
//                     onChange={(e) => handleColorChange('secondary', e.target.value)}
//                     className="ml-3 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Accent Color
//                 </label>
//                 <div className="flex items-center">
//                   <input 
//                     type="color" 
//                     value={themeColors.accent} 
//                     onChange={(e) => handleColorChange('accent', e.target.value)}
//                     className="w-12 h-10 border-none rounded"
//                   />
//                   <input 
//                     type="text" 
//                     value={themeColors.accent} 
//                     onChange={(e) => handleColorChange('accent', e.target.value)}
//                     className="ml-3 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Sidebar Color
//                 </label>
//                 <div className="flex items-center">
//                   <input 
//                     type="color" 
//                     value={themeColors.sidebarColor} 
//                     onChange={(e) => handleColorChange('sidebarColor', e.target.value)}
//                     className="w-12 h-10 border-none rounded"
//                   />
//                   <input 
//                     type="text" 
//                     value={themeColors.sidebarColor} 
//                     onChange={(e) => handleColorChange('sidebarColor', e.target.value)}
//                     className="ml-3 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Background Color
//                 </label>
//                 <div className="flex items-center">
//                   <input 
//                     type="color" 
//                     value={themeColors.bgColor} 
//                     onChange={(e) => handleColorChange('bgColor', e.target.value)}
//                     className="w-12 h-10 border-none rounded"
//                   />
//                   <input 
//                     type="text" 
//                     value={themeColors.bgColor} 
//                     onChange={(e) => handleColorChange('bgColor', e.target.value)}
//                     className="ml-3 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
//               </div>

//               <div className="mt-6 flex justify-between">
//                 <button
//                   onClick={() => {
//                     // Reset to default theme
//                     setThemeColors({
//                       primary: '#4f46e5',
//                       secondary: '#0ea5e9',
//                       accent: '#8b5cf6',
//                       bgColor: '#f9fafb',
//                       headerColor: '#ffffff',
//                       sidebarColor: '#1e293b',
//                       textColor: '#1f2937',
//                     });
//                   }}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                 >
//                   Reset to Default
//                 </button>
//                 <div className="flex space-x-3">
//                   <button
//                     onClick={() => setShowThemeModal(false)}
//                     // className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray