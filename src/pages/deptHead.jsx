import { useState } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Clock, Filter, LogOut, Menu, Plus, Search, Users } from 'lucide-react';

// Main App Component
export default function DepartmentHeadDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-800 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen ? (
            <h2 className="text-xl font-bold">Edu Portal</h2>
          ) : (
            <h2 className="text-xl font-bold">EP</h2>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white p-1 rounded hover:bg-blue-700">
            <Menu size={20} />
          </button>
        </div>
        
        <div className="mt-8 flex flex-col flex-1">
          <NavItem 
            icon={<Calendar size={20} />} 
            label="Dashboard" 
            isActive={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            sidebarOpen={sidebarOpen}
          />
          <NavItem 
            icon={<Users size={20} />} 
            label="Students" 
            isActive={activeTab === 'students'} 
            onClick={() => setActiveTab('students')}
            sidebarOpen={sidebarOpen}
          />
          <NavItem 
            icon={<Clock size={20} />} 
            label="Schedule" 
            isActive={activeTab === 'schedule'} 
            onClick={() => setActiveTab('schedule')}
            sidebarOpen={sidebarOpen}
          />
        </div>

        <div className="mt-auto mb-4">
          <NavItem 
            icon={<LogOut size={20} />} 
            label="Logout" 
            isActive={false} 
            onClick={() => alert('Logout clicked')}
            sidebarOpen={sidebarOpen}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white p-4 shadow">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {activeTab === 'dashboard' && 'Department Head Dashboard'}
              {activeTab === 'students' && 'Student Management'}
              {activeTab === 'schedule' && 'Schedule Management'}
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  DH
                </div>
                <span className="font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'students' && <StudentsContent />}
          {activeTab === 'schedule' && <ScheduleContent />}
        </main>
      </div>
    </div>
  );
}

// Navigation Item Component
function NavItem({ icon, label, isActive, onClick, sidebarOpen }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center p-3 my-1 ${
        isActive ? 'bg-blue-700 font-medium' : 'hover:bg-blue-700'
      } rounded-lg transition mx-2`}
    >
      <span className="mr-3">{icon}</span>
      {sidebarOpen && <span>{label}</span>}
    </button>
  );
}

// Dashboard Content
function DashboardContent() {
  const stats = [
    { title: 'Total Students', value: '548', change: '+12%', icon: <Users size={20} className="text-blue-500" /> },
    { title: 'Classes Scheduled', value: '32', change: '+5%', icon: <Calendar size={20} className="text-green-500" /> },
    { title: 'Lab Sessions', value: '16', change: '-2%', icon: <Clock size={20} className="text-purple-500" /> },
    { title: 'Schedule Changes', value: '8', change: '+25%', icon: <ChevronDown size={20} className="text-orange-500" /> },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} since last month
                </span>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Schedule Changes</h2>
            <button className="text-blue-500 text-sm font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
              { teacher: 'Dr. Smith', subject: 'Advanced Mathematics', change: 'Requested room change', time: '2 hours ago' },
              { teacher: 'Prof. Johnson', subject: 'Computer Science', change: 'Rescheduled to Friday', time: '1 day ago' },
              { teacher: 'Dr. Williams', subject: 'Physics Lab', change: 'Extended duration by 30 mins', time: '2 days ago' },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.teacher}</p>
                  <p className="text-sm text-gray-500">{item.subject}</p>
                  <p className="text-sm text-blue-500">{item.change}</p>
                </div>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Upcoming Schedule</h2>
            <button className="text-blue-500 text-sm font-medium">Full Calendar</button>
          </div>
          
          <div className="space-y-3">
            {[
              { title: 'CSE-101 Lecture', location: 'Room 301', time: '09:00 - 10:30', date: 'Today' },
              { title: 'Physics Lab', location: 'Lab B2', time: '11:00 - 13:00', date: 'Today' },
              { title: 'Mathematics Tutorial', location: 'Room 105', time: '14:00 - 15:30', date: 'Today' },
              { title: 'Database Systems', location: 'Computer Lab', time: '09:00 - 11:00', date: 'Tomorrow' },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.time}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Students Management Content
function StudentsContent() {
  const [showAddForm, setShowAddForm] = useState(false);
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedSection, setSelectedSection] = useState('All Sections');

  const students = [
    { id: 'STU001', name: 'Alex Johnson', year: '1st Year', section: 'A', email: 'alex@example.com', phone: '123-456-7890' },
    { id: 'STU002', name: 'Sarah Williams', year: '1st Year', section: 'B', email: 'sarah@example.com', phone: '123-456-7891' },
    { id: 'STU003', name: 'Michael Brown', year: '2nd Year', section: 'A', email: 'michael@example.com', phone: '123-456-7892' },
    { id: 'STU004', name: 'Emma Davis', year: '2nd Year', section: 'B', email: 'emma@example.com', phone: '123-456-7893' },
    { id: 'STU005', name: 'James Wilson', year: '3rd Year', section: 'A', email: 'james@example.com', phone: '123-456-7894' },
  ];

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Student Management</h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} />
            <span>Add Student</span>
          </button>
        </div>

        {showAddForm && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-4">Add New Student</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                <input type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button 
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">Year:</span>
            <div className="relative">
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-gray-100 py-2 pl-3 pr-8 rounded border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">Section:</span>
            <div className="relative">
              <select 
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="appearance-none bg-gray-100 py-2 pl-3 pr-8 rounded border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Sections</option>
                <option>Section A</option>
                <option>Section B</option>
                <option>Section C</option>
              </select>
              <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          
          <div className="flex items-center ml-auto">
            <button className="flex items-center gap-1 text-gray-600 bg-gray-100 px-3 py-2 rounded">
              <Filter size={16} />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 whitespace-nowrap">{student.id}</td>
                  <td className="py-3 px-4 whitespace-nowrap font-medium">{student.name}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{student.year}</td>
                  <td className="py-3 px-4 whitespace-nowrap">Section {student.section}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{student.email}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{student.phone}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">Showing 5 of 50 students</p>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded border hover:bg-gray-100">
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">3</button>
            <button className="p-1 rounded border hover:bg-gray-100">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Schedule Management Content
function ScheduleContent() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
  const [selectedYear, setSelectedYear] = useState('1st Year');
  const [selectedSection, setSelectedSection] = useState('Section A');
  
  // Sample schedule data
  const scheduleData = {
    'Monday': {
      '9:00 AM': { subject: 'Mathematics', teacher: 'Dr. Smith', room: '101', type: 'lecture' },
      '11:00 AM': { subject: 'Physics', teacher: 'Prof. Johnson', room: '204', type: 'lecture' },
      '2:00 PM': { subject: 'Computer Science', teacher: 'Dr. Williams', room: '305', type: 'lab' },
    },
    'Tuesday': {
      '10:00 AM': { subject: 'Chemistry', teacher: 'Dr. Brown', room: '102', type: 'lecture' },
      '1:00 PM': { subject: 'English', teacher: 'Prof. Davis', room: '203', type: 'lecture' },
    },
    'Wednesday': {
      '9:00 AM': { subject: 'Physics Lab', teacher: 'Prof. Johnson', room: 'Lab 2', type: 'lab' },
      '1:00 PM': { subject: 'Mathematics', teacher: 'Dr. Smith', room: '101', type: 'lecture' },
    },
    'Thursday': {
      '11:00 AM': { subject: 'Computer Science', teacher: 'Dr. Williams', room: '305', type: 'lecture' },
      '2:00 PM': { subject: 'Chemistry Lab', teacher: 'Dr. Brown', room: 'Lab 1', type: 'lab' },
    },
    'Friday': {
      '9:00 AM': { subject: 'English', teacher: 'Prof. Davis', room: '203', type: 'lecture' },
      '11:00 AM': { subject: 'Mathematics', teacher: 'Dr. Smith', room: '101', type: 'lecture' },
      '2:00 PM': { subject: 'Computer Lab', teacher: 'Dr. Williams', room: 'Lab 3', type: 'lab' },
    },
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Schedule Management</h2>
          
          <div className="flex flex-wrap gap-4 mt-2 sm:mt-0">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Year:</span>
              <div className="relative">
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="appearance-none bg-gray-100 py-2 pl-3 pr-8 rounded border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
                <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Section:</span>
              <div className="relative">
                <select 
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="appearance-none bg-gray-100 py-2 pl-3 pr-8 rounded border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Section A</option>
                  <option>Section B</option>
                  <option>Section C</option>
                </select>
                <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            
            <button 
              className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus size={18} />
              <span>Add Class</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                {days.map(day => (
                  <th key={day} className="py-3 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(time => (
                <tr key={time}>
                  <td className="py-3 px-4 border font-medium">{time}</td>
                  {days.map(day => {
                    const session = scheduleData[day]?.[time];
                    return (
                      <td key={`${day}-${time}`} className="py-2 px-3 border">
                        {session ? (
                          <div className={`p-2 rounded ${session.type === 'lab' ? 'bg-blue-100 border-l-4 border-blue-500' : 'bg-green-100 border-l-4 border-green-500'}`}>
                            <p className="font-medium">{session.subject}</p>
                            <p className="text-sm text-gray-600">{session.teacher}</p>
                            <p className="text-sm text-gray-600">Room: {session.room}</p>
                            <div className="mt-1 flex gap-1">
                              <button className="text-xs text-blue-600 hover:text-blue-800">Edit</button>
                              <button className="text-xs text-red-600 hover:text-red-800">Remove</button>
                            </div>
                          </div>
                        ) : (
                          <button className="w-full h-full min-h-10 flex items-center justify-center text-gray-400 hover:bg-gray-50">
                            <Plus size={18} />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Schedule Change Requests</h3>
        <div className="space-y-4">
          {[
            { teacher: 'Dr. Smith', subject: 'Mathematics', current: 'Monday, 9:00 AM', requested: 'Monday, 2:00 PM', reason: 'Conflict with department meeting', status: 'pending' },
            { teacher: 'Prof. Johnson', subject: 'Physics Lab', current: 'Wednesday, 9:00 AM', requested: 'Wednesday, 11:00 AM', reason: 'Equipment availability', status: 'approved' },
            { teacher: 'Dr. Williams', subject: 'Computer Science', current: 'Monday, 2:00 PM', requested: 'Tuesday, 11:00 AM', reason: 'Personal appointment', status: 'rejected' },
          ].map((request, idx) => (
            <div key={idx} className="flex flex-wrap justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div className="mb-2 md:mb-0">
                <p className="font-medium">{request.teacher}</p>
                <p className="text-sm text-gray-600">{request.subject}</p>
                <p className="text-sm">
                  <span className="text-gray-500">From:</span> {request.current} <span className="text-gray-500">To:</span> {request.requested}
                </p>
                <p className="text-sm text-gray-600">Reason: {request.reason}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  request.status === 'approved' ? 'bg-green-100 text-green-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
                {request.status === 'pending' && (
                  <>
                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">Approve</button>
                    <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">Reject</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}