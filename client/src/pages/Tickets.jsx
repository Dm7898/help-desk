import { useState, useEffect } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get("/api/tickets/unautorised");
        setTickets(response.data);
      } catch (err) {
        setError("Failed to fetch tickets");
        console.error("Error fetching tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleAddNoteClick = () => {
    navigate("/login");
  };

  if (loading) {
    return <p>Loading tickets...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-h1 text-center font-bold lg:text-4xl text-3xl my-6">
        Tickets
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.length === 0 ? (
          <p>No tickets available.</p>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white px-4 py-6 shadow-lg rounded-md"
            >
              <h3 className="text-xl text-h4 font-semibold mb-1">
                {ticket.title}
              </h3>
              <p className="text-paragraph mb-1">{ticket.description}</p>
              <p className="text-sm text-gray-500">
                Created on: {new Date(ticket.lastUpdated).toLocaleDateString()}
              </p>
              <button
                onClick={handleAddNoteClick}
                className="mt-3 bg-button text-white px-4 py-1 rounded-md transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-600"
              >
                Add Note
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tickets;
