import { useState, useEffect, useContext } from "react";
import { api } from "../api";
import { AuthContext } from "../AuthContext";

function EditUserForm({ selectedUser, setShowEditForm, fetchUsers }) {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(selectedUser.name);
  const [email, setEmail] = useState(selectedUser.email);
  const [role, setRole] = useState(selectedUser.role);

  useEffect(() => {
    setName(selectedUser.name);
    setEmail(selectedUser.email);
    setRole(selectedUser.role);
  }, [selectedUser]);

  const validateEmail = (email) => {
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailPattern.test(email);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    // Check if there are any changes
    if (
      name === selectedUser.name &&
      email === selectedUser.email &&
      role === selectedUser.role
    ) {
      alert("No changes were made.");
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const updatedUser = { name, email, role };

    try {
      const response = await api.put(
        `/api/admin/${selectedUser._id}/update`,
        updatedUser,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      await fetchUsers();
      setShowEditForm(false);
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating user:", error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred!";
      alert(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleUpdateUser}
      className="space-y-6 p-6 bg-white rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-semibold">Edit User</h3>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Customer">Customer</option>
        <option value="Admin">Admin</option>
        <option value="Agent">Agent</option>
      </select>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-button text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Update User
        </button>
        <button
          type="button"
          onClick={() => setShowEditForm(false)}
          className="bg-gray-400 text-white py-2 px-6 rounded-md hover:bg-gray-500 transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditUserForm;
