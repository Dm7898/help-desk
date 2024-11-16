import { useState, useContext } from "react";
import { api } from "../api";
import { AuthContext } from "../AuthContext";

const TicketForm = ({ onTicketCreated }) => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/api/tickets/create",
        { title, description },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      onTicketCreated(response.data);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating ticket:", error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred!";
      alert(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="ticket-form bg-white p-6 shadow-lg rounded-lg mb-6 max-w-3xl mx-auto"
    >
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">
        Create New Ticket
      </h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ticket Title"
        className="w-full p-3 border rounded-lg mb-4 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Ticket Description"
        className="w-full p-3 border rounded-lg mb-4 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        required
      />

      <button
        type="submit"
        className="bg-button text-white py-3 px-6 rounded-md w-full transition hover:bg-blue-600"
      >
        Create Ticket
      </button>
    </form>
  );
};

export default TicketForm;
