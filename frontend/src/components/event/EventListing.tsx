import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { CONFIGS } from "../../config/global";

interface Event {
  id: number;
  name: string;
  description: string;
  startDate: string; 
  endDate: string;
  totalGuests: number;
  images?: string[];
}

const EventListing: React.FC = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("startDate");
  const [order, setOrder] = useState("ASC");
  const [search, setSearch] = useState("");

  const SortByDate = () => {
    return order === "ASC" ? (
      <FaChevronDown onClick={() => setOrder("DESC")} />
    ) : (
      <FaChevronUp onClick={() => setOrder("ASC")} />
    );
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${CONFIGS.API_CLIENT}event`, {
        params: {
          page,
          limit,
          sort,
          order,
          search,
        },
      });
      setEvents(response?.data?.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [
    page,
    limit,
    sort,
    order,
    search,
  ]);

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`${CONFIGS.API_CLIENT}event/${id}`);
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Event Listing</h1>
        <button
          onClick={() => navigate("/create")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create Event
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 pl-10 border border-gray-300 rounded w-full"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>
      </div>

      {/* Event Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th
              onClick={() => setSort("startDate")}
              className="flex gap-2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            >
              Start Date <SortByDate />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              End Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider float-end">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events?.map((event) => (
            <tr key={event.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {event.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(event.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(event.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2 float-end">
                <MdEdit
                  onClick={() => handleEdit(event.id)}
                  className="text-blue-500 cursor-pointer"
                  title="Edit"
                />
                <MdDelete
                  onClick={() => handleDelete(event.id)}
                  className="text-red-500 cursor-pointer"
                  title="Delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : page)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-lg">{`Page ${page}`}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventListing;
