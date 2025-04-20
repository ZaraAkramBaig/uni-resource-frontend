import React, { useState } from 'react'

export default function StudentsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => setActiveTab('profile')} 
              className={`w-full text-left p-2 rounded-lg ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-gray-200'}`}
            >
              Edit Profile
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('schedule')} 
              className={`w-full text-left p-2 rounded-lg ${activeTab === 'schedule' ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-gray-200'}`}
            >
              View Schedule
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        {activeTab === 'profile' && (
          <section>
            <h2 className="text-3xl font-bold mb-4">Edit Profile</h2>
            <form className="space-y-4 max-w-lg">
              <div>
                <label className="block text-gray-800 mb-1">Full Name</label>
                <input type="text" className="w-full p-2 border rounded-lg" placeholder="Enter your full name" />
              </div>
              <div>
                <label className="block text-gray-800 mb-1">Email</label>
                <input type="email" className="w-full p-2 border rounded-lg" placeholder="Enter your email" />
              </div>
              <div>
                <label className="block text-gray-800 mb-1">Department</label>
                <input type="text" className="w-full p-2 border rounded-lg" placeholder="Enter your department" />
              </div>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
            </form>
          </section>
        )}

        {activeTab === 'schedule' && (
          <section>
            <h2 className="text-3xl font-bold mb-4">Your Schedule</h2>
            <ul className="space-y-4">
              <li className="p-4 bg-white rounded-lg shadow-md">Monday - Database Management Systems (9:00 AM - 11:00 AM)</li>
              <li className="p-4 bg-white rounded-lg shadow-md">Tuesday - Computer Organization (10:00 AM - 12:00 PM)</li>
              <li className="p-4 bg-white rounded-lg shadow-md">Wednesday - Linear Algebra (11:00 AM - 1:00 PM)</li>
              <li className="p-4 bg-white rounded-lg shadow-md">Thursday - Algorithms (1:00 PM - 3:00 PM)</li>
              <li className="p-4 bg-white rounded-lg shadow-md">Friday - Software Engineering (2:00 PM - 4:00 PM)</li>
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};
