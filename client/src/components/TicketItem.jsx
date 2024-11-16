import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { FiPaperclip } from "react-icons/fi";

const TicketItem = ({ ticket, onAddNote, onStatusChange, user }) => {
  const { isAgent, isAdmin } = useContext(AuthContext);
  const [note, setNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [status, setStatus] = useState(ticket.status);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (note) {
      onAddNote(ticket._id, note, selectedFile);
      setNote("");
      setSelectedFile(null);
      setShowNoteInput(false);
    }
  };

  const handleStatusUpdate = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onStatusChange(ticket._id, newStatus);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="ticket-item border p-6 bg-white rounded-lg shadow-lg flex flex-col gap-4">
      {/* Ticket Header */}
      <div className="ticket-header mb-2">
        <h3 className="font-semibold text-xl text-gray-800">{ticket.title}</h3>
        <p className="text-sm text-gray-500">ID: {ticket._id}</p>
        <p className="text-sm text-gray-500">Customer: {ticket.customerName}</p>
      </div>

      {/* Ticket Status */}
      <div className="ticket-status mb-2">
        {isAgent() || isAdmin() ? (
          <div>
            <span className="mr-1">Status:</span>
            <select
              value={status}
              onChange={handleStatusUpdate}
              className="p-2 border rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        ) : (
          <p className="text-sm text-gray-600">Status: {status}</p>
        )}
      </div>

      {/* Last Updated */}
      <div className="ticket-last-updated mb-2 text-sm text-gray-500">
        <p>
          Last Updated: {new Date(ticket.lastUpdated).toLocaleDateString()} -{" "}
          {new Date(ticket.lastUpdated).toLocaleTimeString()}
        </p>
      </div>

      {/* Ticket Actions */}
      <div className="ticket-actions">
        {(isAgent() || isAdmin() || ticket.createdBy === user.id) &&
          (showNoteInput ? (
            <form onSubmit={handleAddNote} className="flex flex-col gap-4">
              {/* Note Input */}
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter note"
                className="p-3 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* File Upload */}
              <label
                htmlFor={`file-upload-${ticket._id}`}
                className="cursor-pointer flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md border hover:bg-gray-300 transition"
              >
                <FiPaperclip className="text-gray-600 w-5 h-5" />
                <span className="text-sm text-gray-600">Attach File</span>
              </label>
              <input
                id={`file-upload-${ticket._id}`}
                type="file"
                name="attachment"
                onChange={handleFileUpload}
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              />

              {/* Selected File Display */}
              {selectedFile && (
                <p className="text-sm text-gray-600 mt-2">
                  Attached file: {selectedFile.name}
                </p>
              )}

              {/* Actions Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="bg-button text-white px-4 py-2 rounded-md transition hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowNoteInput(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowNoteInput(true)}
              className="bg-button text-white px-4 py-2 rounded-md w-full transition hover:bg-blue-600"
            >
              Add Note
            </button>
          ))}
      </div>
    </div>
  );
};

export default TicketItem;
