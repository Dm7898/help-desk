import TicketList from "../components/TicketList";
function CustomerDashboard() {
  return (
    <div>
      <h2 className="text-center text-h1 lg:my-6 mt-2 mb-6 font-bold text-3xl lg:text-4xl">
        Customer Dashboard
      </h2>
      <TicketList />
    </div>
  );
}

export default CustomerDashboard;
