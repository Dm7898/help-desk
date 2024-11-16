import { useEffect, useState, useContext, useCallback } from "react";
import { api } from "../api";
import { AuthContext } from "../AuthContext";
import NewUserForm from "./NewUserForm";
import EditUserForm from "./EditUserFrom";

function UserList({ onCustomerCountUpdate }) {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [formType, setFormType] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  // const [changeMessage, setChangeMessage] = useState(null);
  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setUsers(response.data);
      if (
        onCustomerCountUpdate &&
        typeof onCustomerCountUpdate === "function"
      ) {
        const customerCount = response.data.filter(
          (user) => user.role === "Customer"
        ).length;
        onCustomerCountUpdate(customerCount);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [user?.token, onCustomerCountUpdate]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUserClick = () => {
    setFormType("create");
  };

  const handleDeleteUser = async (userId) => {
    // Show confirmation dialog before deleting
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (isConfirmed) {
      try {
        await api.delete(`/api/admin/${userId}/delete`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        await fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    } else {
      console.log("User deletion canceled.");
    }
  };

  const handleEditUserClick = (user) => {
    setSelectedUser(user);
    setFormType("edit");
  };

  return (
    <div className="rounded-lg bg-white lg:px-6 px-1 py-6">
      {/* Button to trigger the form */}
      <div className="mb-4">
        <button
          onClick={handleCreateUserClick}
          className="py-2 px-6 bg-button text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Create New User
        </button>
      </div>

      {/* Conditionally render the NewUserForm */}
      {formType === "create" && (
        <NewUserForm
          setShowCreateForm={() => setFormType(null)}
          fetchUsers={fetchUsers}
        />
      )}

      {/* Conditionally render the EditUserForm */}
      {formType === "edit" && selectedUser && (
        <EditUserForm
          selectedUser={selectedUser}
          setShowEditForm={() => setFormType(null)}
          fetchUsers={fetchUsers}
        />
      )}

      {/* User List */}
      <div className="mt-4">
        <ul className="space-y-2">
          {users.map((user, index) => (
            <li
              key={user._id || user.name || index}
              className="flex justify-between items-center py-1 lg:px-4 px-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-200"
            >
              <span className="text-md text-h1">
                {user.name} - {user.role}
              </span>
              <div className="space-x-4">
                <button
                  onClick={() => handleEditUserClick(user)}
                  className="text-blue-500 hover:text-blue-700 bg-blue-200 px-4 py-1 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="text-red-500 hover:text-red-700 bg-red-100 px-4 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserList;
