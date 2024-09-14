import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post('/api/users/login', { name });
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 bg-white shadow-lg rounded">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="border p-2 w-full mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
