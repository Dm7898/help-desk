import { useState, useContext } from "react";
import { api } from "../api";
import { AuthContext } from "../AuthContext";
function NewUserForm({ setShowCreateForm, fetchUsers }) {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Customer");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateEmail = (email) => {
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailPattern.test(email);
  };
  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    const newUser = { name, email, role, password };

    try {
      const response = await api.post("/api/admin/add/user", newUser, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      console.log("User created:", response.data);
      await fetchUsers();
      alert("User Created Successfully");
      //   setUsers((prevUsers) => [...prevUsers, response.data]);
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating user:", error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred!";
      alert(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleCreateUser}
      className="space-y-6 p-6 bg-white rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-semibold">Create New User</h3>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
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

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-button text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Create User
        </button>
        <button
          type="button"
          onClick={() => setShowCreateForm(false)}
          className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default NewUserForm;
