import React from 'react'
import { Link } from 'react-router-dom'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



export default function Home() {
  return (
    <div>    
       {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow p-8 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Welcome to the Intelligent Resource Allocator</h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-8">
          Empower your institution with seamless resource management. From SuperAdmins orchestrating institutions to Admins and Department Heads optimizing resources — simplify the complex, effortlessly.
        </p>
        <div className="flex space-x-4">
          <Link to="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Get Started</Link>
          <Link to="/about" className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Learn More</Link>
        </div>
      </main>

      {/* Cards Section */}
      <section className="px-8 py-12 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Efficient Resource Management</h3>
            <p className="text-gray-600">Optimize your institution's resources, ensuring nothing goes to waste. Our intelligent system helps you track, allocate, and manage resources efficiently, preventing overuse or shortages.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">User Role Hierarchy</h3>
            <p className="text-gray-600">Seamlessly manage roles — SuperAdmins, Admins, Department Heads, and more. Ensure only authorized personnel can allocate and request resources, maintaining organizational control and security.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Real-Time Updates</h3>
            <p className="text-gray-600">Get instant feedback and updates on resource allocations and requests. Stay informed with live notifications, ensuring smooth operations and swift decision-making.</p>
          </div>
        </div>
      </section>

      
  <div className='w-2/5 m-auto py-14'>
          <Swiper
          // install Swiper modules
          modules={[Navigation, Scrollbar, A11y]}
          slidesPerView={1}
          navigation
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide>
      <div className=" p-6 bg-white rounded-lg shadow-md text-center">
            <p className="text-gray-600">"This platform transformed how we manage resources. Incredibly intuitive and fast!"</p>
            <p className="mt-4 font-bold">- Admin, XYZ Institution</p>
          </div>
      </SwiperSlide>
      <SwiperSlide><div className=" p-6 bg-white rounded-lg shadow-md text-center">
            <p className="text-gray-600">"A game-changer for our department. Resource allocation has never been this smooth."</p>
            <p className="mt-4 font-bold">- Department Head, ABC University</p>
          </div></SwiperSlide>
      <SwiperSlide><div className=" p-6 bg-white rounded-lg shadow-md text-center">
            <p className="text-gray-600">"Highly recommend! Streamlined all our processes effortlessly."</p>
            <p className="mt-4 font-bold">- SuperAdmin, LMN College</p>
          </div></SwiperSlide>
    </Swiper>
        </div>

  {/* Footer */}
  <footer className="bg-gray-600 text-center p-4 text-white shadow-t-md">
    © 2025 Intelligent Resource Allocator. All rights reserved.
  </footer>
</div>
  )
}
