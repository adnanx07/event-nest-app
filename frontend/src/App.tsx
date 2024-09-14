import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateEvent from './components/event/CreateEvent';
import EventListing from './components/event/EventListing';
import Login from './components/user/Login';
import EditEvent from './components/event/EditEvent';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-3xl font-bold text-center">Event Management</h1>
        </header>
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<EventListing />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/edit/:id" element={<EditEvent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
