import React, { useState } from 'react';

const AddBusForm = () => {
  const [formData, setFormData] = useState({
    busId: '',
    busName: '',
    busType: 'Standard',
    busOwner: '',
    busOwnerNIC: '',
    busOwnerContact: '',
    busOwnerEmail: '',
    busOwnerAddress: '',
    routeId: '',
    totalSeats: '',
    seatPosition: {
      leftPosition: { numberOfSeatsPerRow: '', numberOfRows: '' },
      rightPosition: { numberOfSeatsPerRow: '', numberOfRows: '' },
      backPosition: { numberOfSeatsPerRow: '', numberOfRows: '' },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    if (keys.length === 1) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: value,
      }));
    } else if (keys.length === 3) {
      setFormData((prev) => ({
        ...prev,
        seatPosition: {
          ...prev.seatPosition,
          [keys[0]]: {
            ...prev.seatPosition[keys[0]],
            [keys[2]]: value,
          },
        },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Bus Data:', formData);
    alert('Bus added successfully!');
    // Clear the form
    setFormData({
      busId: '',
      busName: '',
      busType: 'Standard',
      busOwner: '',
      busOwnerNIC: '',
      busOwnerContact: '',
      busOwnerEmail: '',
      busOwnerAddress: '',
      routeId: '',
      totalSeats: '',
      seatPosition: {
        leftPosition: { numberOfSeatsPerRow: '', numberOfRows: '' },
        rightPosition: { numberOfSeatsPerRow: '', numberOfRows: '' },
        backPosition: { numberOfSeatsPerRow: '', numberOfRows: '' },
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add New Bus</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Bus Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Bus ID</label>
          <input
            type="text"
            name="busId"
            value={formData.busId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bus Name</label>
          <input
            type="text"
            name="busName"
            value={formData.busName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bus Type</label>
          <select
            name="busType"
            value={formData.busType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="Standard">Standard</option>
            <option value="Luxury">Luxury</option>
            <option value="Semi-Luxury">Semi-Luxury</option>
          </select>
        </div>
        {/* Owner Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Owner Name</label>
          <input
            type="text"
            name="busOwner"
            value={formData.busOwner}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Owner NIC</label>
          <input
            type="text"
            name="busOwnerNIC"
            value={formData.busOwnerNIC}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="text"
            name="busOwnerContact"
            value={formData.busOwnerContact}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="busOwnerEmail"
            value={formData.busOwnerEmail}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="busOwnerAddress"
            value={formData.busOwnerAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        {/* Seat Position Information */}
        <div>
          <h2 className="text-lg font-bold">Seat Position</h2>
          <div className="grid grid-cols-3 gap-4">
            {['leftPosition', 'rightPosition', 'backPosition'].map((position) => (
              <div key={position}>
                <h3 className="font-semibold capitalize">{position.replace('Position', '')}</h3>
                <label className="block text-sm">Seats Per Row</label>
                <input
                  type="number"
                  name={`${position}.numberOfSeatsPerRow`}
                  value={formData.seatPosition[position].numberOfSeatsPerRow}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <label className="block text-sm">Number of Rows</label>
                <input
                  type="number"
                  name={`${position}.numberOfRows`}
                  value={formData.seatPosition[position].numberOfRows}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Seats</label>
          <input
            type="number"
            name="totalSeats"
            value={formData.totalSeats}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        {/* Route ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Route ID</label>
          <input
            type="text"
            name="routeId"
            value={formData.routeId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Bus
        </button>
      </form>
    </div>
  );
};

export default AddBusForm;
