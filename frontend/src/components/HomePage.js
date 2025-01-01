import React from "react";

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-xl font-bold">Book My Seat</a>
          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6">
            <li>
              <a href="/" className="hover:text-gray-200">Home</a>
            </li>
            <li>
              <a href="#search" className="hover:text-gray-200">Book Now</a>
            </li>
            <li>
              <a href="#routes" className="hover:text-gray-200">Routes</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-200">Contact Us</a>
            </li>
          </ul>
          {/* Mobile Menu */}
          <div className="hidden md:flex gap-4">
            <a href="/login" className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-100">Login</a>
            <a href="/signup" className="bg-gray-200 text-blue-600 py-2 px-4 rounded hover:bg-gray-300">Sign Up</a>
          </div>
          <button className="md:hidden text-white hover:text-gray-200">
            {/* Hamburger Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Header Section */}
      <header
        className="bg-cover bg-center h-screen text-white flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/images/bus2.png')", // Correct path from the public folder
          backgroundPosition: 'center', // Ensures the image is centered
          backgroundSize: 'cover', // Ensures the image covers the entire header
        }}
      >
        {/* Search Section */}
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Find Your Bus</h2>
          <form className="flex flex-col md:flex-row items-center justify-center gap-4">
            {/* FROM Dropdown */}
            <select
              className="w-full md:w-1/4 p-3 border border-gray-300 rounded"
            >
              <option value="">From</option>
              <option value="New York">New York</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Chicago">Chicago</option>
              {/* Add more locations */}
            </select>
            {/* TO Dropdown */}
            <select
              className="w-full md:w-1/4 p-3 border border-gray-300 rounded"
            >
              <option value="">To</option>
              <option value="Boston">Boston</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Detroit">Detroit</option>
              {/* Add more locations */}
            </select>
            {/* Travel Date Input */}
            <input
              type="date"
              className="w-full md:w-1/4 p-3 border border-gray-300 rounded"
            />
            {/* Search Button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
            >
              Search
            </button>
          </form>
        </div>
      </header>

      {/* Search Section */}
      <section id="search" className="bg-gray-100 py-16">
        {/* Search Section */}
<div className="container mx-auto px-4 text-center">
  <h2 className="text-4xl md:text-6xl font-bold mb-6">Find Your Bus</h2>
  <form className="flex flex-col md:flex-row items-center justify-center gap-4">
    {/* FROM Dropdown */}
    <select
      className="w-full md:w-1/4 p-3 border border-gray-300 rounded"
    >
      <option value="">From</option>
      <option value="New York">New York</option>
      <option value="San Francisco">San Francisco</option>
      <option value="Chicago">Chicago</option>
      {/* Add more locations */}
    </select>
    
    {/* TO Dropdown */}
    <select
      className="w-full md:w-1/4 p-3 border border-gray-300 rounded"
    >
      <option value="">To</option>
      <option value="Boston">Boston</option>
      <option value="Los Angeles">Los Angeles</option>
      <option value="Detroit">Detroit</option>
      {/* Add more locations */}
    </select>
    
    {/* Travel Date Input */}
    <input
      type="date"
      className="w-full md:w-1/4 p-3 border border-gray-300 rounded"
    />
    
    {/* Search Button */}
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
    >
      Search
    </button>
  </form>
</div>

      </section>

      {/* Featured Routes */}
      <section id="routes" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { route: "New York to Boston", price: "$15" },
              { route: "San Francisco to Los Angeles", price: "$20" },
              { route: "Chicago to Detroit", price: "$12" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-blue-600">{item.route}</h3>
                <p className="mt-2 text-gray-700">Starting from {item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 EasyBus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
