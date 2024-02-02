import React, { useState } from 'react';
import { FaCalendarAlt, FaUser, FaEnvelope, FaClock, FaCut } from 'react-icons/fa';
import { GrInstagram } from 'react-icons/gr';
import { Switch } from '@headlessui/react';
import { useMediaQuery } from 'react-responsive';
import { IconContext } from 'react-icons';

const InputWithIcon = ({ icon, label, darkMode, ...rest }) => (
  <div className="mb-4">
    <label className={`block font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor={rest.id}>
      {label}
    </label>
    <div className="flex items-center">
      <IconContext.Provider value={{ className: `h-5 w-5 mr-2 ${darkMode ? 'text-white' : 'text-gray-600'}` }}>
        {icon}
      </IconContext.Provider>
      <input className={`w-full border border-gray-400 p-2 pl-10 rounded-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`} {...rest} />
    </div>
  </div>
);

const SelectWithIcon = ({ icon, label, darkMode, children, ...rest }) => (
  <div className="mb-4">
    <label className={`block font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor={rest.id}>
      {label}
    </label>
    <div className="flex items-center">
      <IconContext.Provider value={{ className: `h-5 w-5 mr-2 ${darkMode ? 'text-white' : 'text-gray-600'}` }}>
        {icon}
      </IconContext.Provider>
      <select className={`w-full border border-gray-400 p-2 pl-10 rounded-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`} {...rest}>
        {children}
      </select>
    </div>
  </div>
);

const ReservationCard = ({ data, handleEdit, handleDelete, darkMode }) => (
  <div key={data.id} className={`bg-gray-100 rounded-lg mb-4 ${darkMode ? 'bg-gray-700' : ''}`}>
    <div className={`px-4 py-2 ${darkMode ? 'text-black' : 'text-gray-800'}`}>
      <span className="font-semibold">Name:</span> {data.name}
    </div>
    <div className={`px-4 py-2 ${darkMode ? 'text-black' : 'text-gray-800'}`}>
      <span className="font-semibold">Email:</span> {data.email}
    </div>
    <div className={`px-4 py-2 ${darkMode ? 'text-black' : 'text-gray-800'}`}>
      <span className="font-semibold">Date:</span> {data.date}
    </div>
    <div className={`px-4 py-2 ${darkMode ? 'text-black' : 'text-gray-800'}`}>
      <span className="font-semibold">Time:</span> {data.time}
    </div>
    <div className={`px-4 py-2 ${darkMode ? 'text-black' : 'text-gray-800'}`}>
      <span className="font-semibold">Service:</span> {data.service}
    </div>
    <div className="flex justify-end px-4 py-2">
      <button className={`bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 mr-2 ${darkMode ? 'bg-gray-700' : ''}`} onClick={() => handleEdit(data)}>
        Edit
      </button>
      <button className={`bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition-colors duration-300 ${darkMode ? 'bg-gray-700' : ''}`} onClick={() => handleDelete(data.id)}>
        Delete
      </button>
    </div>
  </div>
);

const ReservationList = ({ data, handleEdit, handleDelete, darkMode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {data.map((reservation) => (
      <ReservationCard data={reservation} handleEdit={handleEdit} handleDelete={handleDelete} darkMode={darkMode} />
    ))}
  </div>
);

export default function App() {
  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    date: '',
    time: '',
    service: '',
  });
  const [darkMode, setDarkMode] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para guardar las citas en otra tabla
    const newReservation = { ...formData, id: reservations.length + 1 };
    setReservations([...reservations, newReservation]);
    setFormData({
      id: '',
      name: '',
      email: '',
      date: '',
      time: '',
      service: '',
    });
  };

  const handleEdit = (reservation) => {
    setEditing(true);
    setFormData(reservation);
  };

  const handleUpdate = () => {
    // Aquí puedes agregar la lógica para actualizar la cita en la tabla
    const updatedReservations = reservations.map((reservation) => (reservation.id === formData.id ? formData : reservation));
    setReservations(updatedReservations);
    setEditing(false);
    setFormData({
      id: '',
      name: '',
      email: '',
      date: '',
      time: '',
      service: '',
    });
  };

  const handleDelete = (id) => {
    // Aquí puedes agregar la lógica para eliminar la cita de la tabla
    const updatedReservations = reservations.filter((reservation) => reservation.id !== id);
    setReservations(updatedReservations);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container mx-auto p-4 ${darkMode ? 'bg-gray-900 text-white' : ''}`}>
      <h1 className="text-3xl font-semibold mb-4">
        <span className="gradient-text bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-2">
          <FaCalendarAlt />
        </span>
        Reservation System
      </h1>
      
      <div className="mb-4">
        <Switch
          checked={darkMode}
          onChange={handleDarkModeToggle}
          className={`${darkMode ? 'bg-green-500' : 'bg-gray-400'
          } relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span className={`${darkMode ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white rounded-full`} />
        </Switch>
        <span className={`ml-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>Dark Mode</span>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Make a Reservation</h2>
          <form onSubmit={editing ? handleUpdate : handleSubmit}>
            <InputWithIcon
              icon={<FaUser />}
              label="Name"
              darkMode={darkMode}
              id="name"
              type="text"
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              required
            />
            <InputWithIcon
              icon={<FaEnvelope />}
              label="Email"
              darkMode={darkMode}
              id="email"
              type="email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              required
            />
            <InputWithIcon
              icon={<FaCalendarAlt />}
              label="Date"
              darkMode={darkMode}
              id="date"
              type="date"
              value={formData.date}
              onChange={(event) => setFormData({ ...formData, date: event.target.value })}
              required
            />
            <InputWithIcon
              icon={<FaClock />}
              label="Time"
              darkMode={darkMode}
              id="time"
              type="time"
              value={formData.time}
              onChange={(event) => setFormData({ ...formData, time: event.target.value })}
              required
            />
            <SelectWithIcon
              icon={<FaCut />}
              label="Service"
              darkMode={darkMode}
              id="service"
              value={formData.service}
              onChange={(event) => setFormData({ ...formData, service: event.target.value })}
              required
            >
              <option value="">Select a service</option>
              <option value="Haircut">Veterinaria</option>
              <option value="Shave">Color</option>
              <option value="Coloring">Peluqeria</option>
            </SelectWithIcon>
            <button
              className={`bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white py-2 px-4 rounded-lg mt-4 ${darkMode ? 'bg-gray-700' : ''}`}
            >
              {editing ? 'Update Reservation' : 'Make Reservation'}
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4">Reservations</h2>
          {reservations.length > 0 ? (
            <ReservationList data={reservations} handleEdit={handleEdit} handleDelete={handleDelete} darkMode={darkMode} />
          ) : (
            <p className={`text-lg ${darkMode ? 'text-yellow' : 'text-gray-700'}`}>No reservations yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

