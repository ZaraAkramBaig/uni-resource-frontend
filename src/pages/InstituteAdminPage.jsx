import { useEffect, useState } from 'react';
import { Users, School, BookOpen, Plus, Save, X } from 'lucide-react';
import { fetchAPI } from '../utils/fetchAPI';
import { checkTokenExpiration } from '../utils/jwt_decode';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('departments');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [deptID, setDeptID] = useState(null);
  let decoded = checkTokenExpiration(localStorage.getItem("access_token"));

  const [departments, setDepartments] = useState([]);
  const [deptHeads, setDeptHeads] = useState([]);
  
  useEffect(()=>{
    fetchAPI("http://127.0.0.1:5000/api/departments", "GET").then((val)=> {
      setDepartments(val.departments)
      setLoading(false)
    })
    fetchAPI("http://127.0.0.1:5000/api/department_heads", "GET").then((val)=> {
      console.log(val.department_heads)
      setDeptHeads(val.department_heads)
    })

  }, [])
  
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Dr. James Wilson", email: "j.wilson@example.edu", department: "Computer Science", courses: 3 },
    { id: 2, name: "Dr. Maria Rodriguez", email: "m.rodriguez@example.edu", department: "Physics", courses: 2 },
    { id: 3, name: "Prof. Robert Chen", email: "r.chen@example.edu", department: "Mathematics", courses: 4 },
    { id: 4, name: "Dr. Sarah Johnson", email: "s.johnson@example.edu", department: "Computer Science", courses: 2 },
    { id: 5, name: "Prof. Michael Lee", email: "m.lee@example.edu", department: "Physics", courses: 3 }
  ]);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: "",
    department: '',
    courses: '',
    students: ''
  });
  
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  
  const openAddModal = (type) => {
    setModalType(type);
    setFormData({
      name: '',
      email: '',
      department: '',
      courses: '',
      students: ''
    });
    setShowAddModal(true);
  };

  const handleDeleteRequest = (id) => {
    fetchAPI(`http://127.0.0.1:5000/api/departments/${id}`, "DELETE").then(()=> {
      const depts = departments.filter((dept)=> dept.id !== id);
      setDepartments(depts)
    })

  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalType === 'department') {
      const newDepartment = {
        name: formData.name,
        code: formData.code,
        institution_id: decoded[1].institution_id
      };
      fetchAPI("http://127.0.0.1:5000/api/departments/register", "POST", newDepartment).then(()=>{
        fetchAPI("http://127.0.0.1:5000/api/departments", "GET").then((depts)=>{
          setDepartments(depts)
        })
      }).catch((err)=> alert(err));
    } 
    else if (modalType === 'teacher') {
      const newTeacher = {
        name: formData.name,
        email: formData.email,
        department: formData.department,
        courses: parseInt(formData.courses) || 0
      };
      // fetchAPI("http://127.0.0.1:5000/api/teachers/register", "POST", newTeacher).catch((err)=> alert(err));
      setTeachers([...teachers, newTeacher]);
    } 
    else if (modalType === 'deptHead') {
      
      const newDeptHead = {
        name: formData.name,
        email: formData.email,
        department_id: deptID,
        institution_id: decoded[1].institution_id
      };

      fetchAPI("http://127.0.0.1:5000/api/user/register", "POST", {...newDeptHead, password: formData.password, role: "DeptHead"}).then((val)=>{
        fetchAPI("http://127.0.0.1:5000/api/department_heads/register", "POST", {...newDeptHead, user_id: val.user.id}).then(()=>{
          fetchAPI("http://127.0.0.1:5000/api/department_heads", "GET").then((data)=>{
            setDeptHeads(data)
          })
        }).catch((e)=>{
          alert(e)
        })
      })
      

    }
    
    setShowAddModal(false);
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'departments':
        if (loading) return <div className='text-center'>Loading ...</div>
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Departments</h2>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                onClick={() => openAddModal('department')}
              >
                <Plus size={18} className="mr-1" /> Add Department
              </button>
            </div>
            
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  
                  {departments.length > 0 ? (
                    departments.map((department) => (
                      <tr key={department.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{department.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-red-600 hover:text-red-900" onClick={()=> {handleDeleteRequest(department.id)}}>Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center py-4 text-gray-500">
                        No Registered Departments...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
  
  
        
      case 'teachers':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Teachers</h2>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                onClick={() => openAddModal('teacher')}
              >
                <Plus size={18} className="mr-1" /> Add Teacher
              </button>
            </div>
            
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Courses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{teacher.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{teacher.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{teacher.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{teacher.courses}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-red-600 hover:text-red-900" >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 'deptHeads':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Department Heads</h2>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                onClick={() => openAddModal('deptHead')}
              >
                <Plus size={18} className="mr-1" /> Assign Department Head
              </button>
            </div>
            
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deptHeads.map((head) => (
                    <tr key={head.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{head.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{head.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{(departments.find((dept)=> dept.id === head.department_id)).name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      default:
        return <div>Select a tab</div>;
    }
  };
  
  const renderModal = () => {
    if (!showAddModal) return null;
    
    let title = '';
    let fields = [];
    
    if (modalType === 'department') {
      title = 'Add New Department';
      fields = [
        { name: 'name', label: 'Department Name', type: 'text' },
        { name: 'code', label: 'Department Code', type: 'text' }
      ];
    } 
    else if (modalType === 'teacher') {
      title = 'Add New Teacher';
      fields = [
        { name: 'name', label: 'Teacher Name', type: 'text' },
        { name: 'email', label: 'Email Address', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' },
        { 
          name: 'department', 
          label: 'Department', 
          type: 'select',
          options: departments.map(dept => ({
            value: dept.name,
            label: dept.name
          }))
        },
        { name: 'courses', label: 'Number of Courses', type: 'number' }
      ];
    } 
    else if (modalType === 'deptHead') {
      title = 'Assign Department Head';
      fields = [
        { name: 'name', label: 'Name (if new)', type: 'text' },
        { name: 'email', label: 'Email Address', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' },
        { 
          name: 'department', 
          label: 'Department', 
          type: 'select',
          options: departments.map(dept => ({
            id: dept.id,
            value: dept.name,
            label: dept.name
          }))
        }
      ];
    }
    
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center border-b px-6 py-4">
            <h3 className="text-lg font-medium">{title}</h3>
            <button 
              onClick={() => setShowAddModal(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4 space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  
                  {field.type === 'select' ? (
                    <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      const selectedOption = field.options.find(opt => opt.value === selectedValue);
                      if (selectedOption?.id) {
                        setDeptID(selectedOption.id);
                      }
                      handleInputChange(e); // Keep this to update formData
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    required
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                      required={field.name !== 'name' || modalType !== 'deptHead'}
                    />
                  )}
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="flex items-center justify-center h-16 border-b">
          <School className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-800">EduAdmin</span>
        </div>
        
        <nav className="mt-6">
          <div className="px-4 py-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Management</p>
          </div>
          
          <a
            className={`flex items-center px-6 py-3 text-sm ${activeTab === 'departments' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            href="#departments"
            onClick={() => setActiveTab('departments')}
          >
            <BookOpen size={18} className={activeTab === 'departments' ? 'text-blue-600' : 'text-gray-400'} />
            <span className="mx-4">Departments</span>
          </a>
          
          <a
            className={`flex items-center px-6 py-3 text-sm ${activeTab === 'teachers' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            href="#teachers"
            onClick={() => setActiveTab('teachers')}
          >
            <Users size={18} className={activeTab === 'teachers' ? 'text-blue-600' : 'text-gray-400'} />
            <span className="mx-4">Teachers</span>
          </a>
          
          <a
            className={`flex items-center px-6 py-3 text-sm ${activeTab === 'deptHeads' ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            href="#deptHeads"
            onClick={() => setActiveTab('deptHeads')}
          >
            <Users size={18} className={activeTab === 'deptHeads' ? 'text-blue-600' : 'text-gray-400'} />
            <span className="mx-4">Department Heads</span>
          </a>
          
          
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {renderContent()}
        </main>
      </div>
      
      {/* Modal */}
      {renderModal()}
    </div>
  );
}