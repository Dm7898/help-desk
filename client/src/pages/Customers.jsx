import { useState, useEffect } from "react";
import { api } from "../api";

const PublicCustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/api/user/customers");
        setCustomers(response.data);
      } catch (err) {
        setError("An error occurred while fetching customers.");
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-h1 lg:text-4xl text-2xl font-bold my-6 text-center">
        Our Customers
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {customers.map((customer) => (
          <div
            key={customer._id}
            className="bg-white shadow-lg rounded px-4 py-6 flex flex-col items-center text-center mt-2"
          >
            <div className="w-16 h-16 lg:h-20 lg:w-20 rounded-full bg-button flex items-center justify-center text-xl font-bold text-white">
              {customer.name[0]?.toUpperCase()}
            </div>
            <h2 className="text-lg text-h1 font-semibold mt-2">
              {customer.name}
            </h2>
            <p className="text-sm text-h4">{customer.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicCustomersList;
