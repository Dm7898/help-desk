import { useState, useEffect, useContext } from "react";
import { api } from "../api";
import { AuthContext } from "../AuthContext";
import TicketItem from "./TicketItem";
import TicketForm from "./TicketForm";

const TicketList = ({ onTicketCountUpdate }) => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get("/api/tickets", {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        const sortedTickets = response.data.sort((a, b) => {
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        });

        setTickets(sortedTickets);
        // setTickets(response.data);
        if (onTicketCountUpdate && typeof onTicketCountUpdate === "function") {
          onTicketCountUpdate(response.data.length);
        }
      } catch (err) {
        setError("An error occurred while fetching tickets");
        console.error("An error occurred", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [user, onTicketCountUpdate]);

  const handleAddNote = async (ticketId, noteContent, file) => {
    try {
      const formData = new FormData();
      formData.append("content", noteContent);

      if (file) {
        formData.append("attachment", file);
      }
      // console.log("FormData contents:");
      // formData.forEach((value, key) => {
      //   console.log(`${key}:`, value);
      // });

      const response = await api.post(
        `/api/tickets/${ticketId}/add/notes`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId
            ? {
                ...ticket,
                notes: [...ticket.notes, response.data],
                lastUpdated: new Date(),
              }
            : ticket
        )
      );
      alert("A new note has been added");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await api.put(
        `/api/tickets/${ticketId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );

      // Update the status locally
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );

      setStatusMessage(
        `Status of "${ticketId}" has been updated to "${newStatus}"`
      );

      setTimeout(() => {
        setStatusMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleTicketCreated = (newTicket) => {
    setTickets((prevTickets) => [newTicket, ...prevTickets]);
  };

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div className="container lg:px-16 px-1 mx-auto flex flex-col gap-4 relative ">
      {statusMessage && (
        <p className="bg-green-100 text-green-800 p-2 rounded text-center w-full max-w-md fixed top-4 left-1/2 transform -translate-x-1/2 shadow-lg z-50">
          {statusMessage}
        </p>
      )}

      {user?.role === "Customer" && (
        <div className="w-2/4">
          <TicketForm onTicketCreated={handleTicketCreated} />
        </div>
      )}

      {/* Ticket List Section */}
      <div className="ticket-list w-full mx-auto">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <h2 className="mb-4 font-bold text-h1 text-2xl">Ticket List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tickets.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No tickets available.
            </div>
          ) : (
            tickets.map((ticket) => (
              <TicketItem
                key={ticket._id}
                ticket={ticket}
                onAddNote={handleAddNote}
                onStatusChange={handleStatusChange}
                user={user}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketList;
