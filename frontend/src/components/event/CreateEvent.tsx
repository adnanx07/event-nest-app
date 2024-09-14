import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { CONFIGS } from '../../config/global';

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalGuests, setTotalGuests] = useState('');
  const [images, setImages] = useState<FileList | null>(null);

  const isSubmitEnabled = name && description && startDate && endDate;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('totalGuests', totalGuests);

    if (images) {
      Array.from(images).forEach((file) => {
        formData.append('images', file);
      });
    }

    try {
      await axios.post(`${CONFIGS.API_CLIENT}event`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/')
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    }
  };

  return (
    <>
      <Link className='flex items-center gap-[14px] text-blue-600' to="/"><FaChevronLeft /> Event List</Link>
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            id="name"
            type="text"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            id="startDate"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            id="endDate"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="totalGuests" className="block text-sm font-medium text-gray-700">Total Guests</label>
          <input
            id="totalGuests"
            type="number"
            placeholder="Total Guests"
            value={totalGuests}
            onChange={(e) => setTotalGuests(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Upload Images</label>
          <input
            id="images"
            type="file"
            multiple
            onChange={handleImageChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isSubmitEnabled}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Event
        </button>
      </div>
    </div>
    </>
  );
};

export default CreateEvent;
