import { useState } from "react";
import TicketList from "../components/TicketList";
import UserList from "../components/UserList";

function AdminDashboard() {
  const [ticketCount, setTicketCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const handleTicketCountUpdate = (count) => {
    setTicketCount(count);
  };
  const handleCustomerCountUpdate = (count) => {
    setCustomerCount(count);
  };
  return (
    <div className="lg:p-6 p-1 bg-gray-100 relative">
      <h2 className="text-center text-h1 lg:my-6 mt-2 mb-6 font-bold text-3xl lg:text-4xl">
        Admin Dashboard
      </h2>

      {/* Dashboard Statistics */}
      <div className="relative container mx-auto lg:px-16 px-1 mb-4">
        <div className="flex gap-2 lg:w-1/4 w-full bg-white p-3 rounded-lg shadow-xl z-10">
          <p className="text-sm font-medium">Total Tickets: {ticketCount}</p>
          <p className="text-sm font-medium">
            Total Customers: {customerCount}
          </p>
        </div>
      </div>

      {/* Ticket List */}
      <TicketList onTicketCountUpdate={handleTicketCountUpdate} />

      {/* Manage Users */}
      <section className="mt-8 container mx-auto lg:px-16 px-1">
        <h3 className="text-2xl font-semibold mb-4">Manage User Profiles</h3>
        <UserList onCustomerCountUpdate={handleCustomerCountUpdate} />
      </section>
    </div>
  );
}

export default AdminDashboard;
