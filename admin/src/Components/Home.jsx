import React from 'react'

const Home = () => {
  const currentDate = new Date().toLocaleDateString();
  
  return (
    <div className="p-10">
      {/* Welcome message */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to Admin Panel</h1>
        <p className="text-gray-600 text-lg">Manage your platform efficiently</p>
        <p className="text-gray-500 mt-1">Today's Date: {currentDate}</p>
      </div>

      {/* Admin Panel Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Manage Users</h2>
          <p className="mt-2 text-gray-600">View and edit user details</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Manage Products</h2>
          <p className="mt-2 text-gray-600">Add, edit, and delete products</p>
        </div>
        <div className="bg-red-100 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">View Orders</h2>
          <p className="mt-2 text-gray-600">Track and manage orders</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
