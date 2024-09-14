// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { FaChevronLeft } from "react-icons/fa";
// import { CONFIGS } from "../../config/global";

// const EditEvent: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [event, setEvent] = useState({
//     name: "",
//     description: "",
//     startDate: "",
//     endDate: "",
//     totalGuests: 0,
//     images: [] as string[],
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const response = await axios.get(`${CONFIGS.API_CLIENT}event/${id}`);
//         const eventData = response.data;

//         // Convert dates to datetime-local format
//         const formatDateForInput = (date: string) => {
//           return date ? new Date(date).toISOString().slice(0, 16) : "";
//         };

//         setEvent({
//           ...eventData,
//           startDate: formatDateForInput(eventData.startDate),
//           endDate: formatDateForInput(eventData.endDate),
//         });
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to fetch event details");
//         setLoading(false);
//       }
//     };

//     fetchEvent();
//   }, [id]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setEvent({ ...event, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.put(`${CONFIGS.API_CLIENT}event/${id}`, event);
//       navigate("/"); 
//     } catch (error) {
//       setError("Failed to update event");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <>
//       <Link className="flex items-center gap-[14px] text-blue-600" to="/">
//         <FaChevronLeft /> Event List
//       </Link>
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={event.name}
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded w-full"
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="description"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={event.description}
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded w-full"
//               rows={4}
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="startDate"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Start Date
//             </label>
//             <input
//               type="datetime-local"
//               id="startDate"
//               name="startDate"
//               value={event.startDate}
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded w-full"
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="endDate"
//               className="block text-sm font-medium text-gray-700"
//             >
//               End Date
//             </label>
//             <input
//               type="datetime-local"
//               id="endDate"
//               name="endDate"
//               value={event.endDate}
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded w-full"
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="totalGuests"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Total Guests
//             </label>
//             <input
//               type="number"
//               id="totalGuests"
//               name="totalGuests"
//               value={event.totalGuests}
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded w-full"
//               required
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Update Event
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default EditEvent;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaChevronLeft } from "react-icons/fa";
import { CONFIGS } from "../../config/global";

const EditEvent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    totalGuests: 0,
    images: [] as string[],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${CONFIGS.API_CLIENT}event/${id}`);
        const eventData = response.data;

        // Convert dates to datetime-local format
        const formatDateForInput = (date: string) => {
          return date ? new Date(date).toISOString().slice(0, 16) : "";
        };

        setEvent({
          ...eventData,
          startDate: formatDateForInput(eventData.startDate),
          endDate: formatDateForInput(eventData.endDate),
        });
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch event details");
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`${CONFIGS.API_CLIENT}event/${id}`, event);
      navigate("/");
    } catch (error) {
      setError("Failed to update event");
    }
  };

  // Get today's date in yyyy-MM-dd format for minDate
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Link className="flex items-center gap-[14px] text-blue-600" to="/">
        <FaChevronLeft /> Event List
      </Link>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={event.name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={event.description}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              rows={4}
              required
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={event.startDate}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              min={today} // Restrict start date to today or later
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={event.endDate}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              min={event.startDate} // Restrict end date to be after start date
              required
            />
          </div>
          <div>
            <label htmlFor="totalGuests" className="block text-sm font-medium text-gray-700">
              Total Guests
            </label>
            <input
              type="number"
              id="totalGuests"
              name="totalGuests"
              value={event.totalGuests}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Update Event
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditEvent;
