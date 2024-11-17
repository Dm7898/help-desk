import { Link, useNavigate } from "react-router-dom";
import { CiUser, CiMenuFries } from "react-icons/ci";
import { PiTicket } from "react-icons/pi";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const [toggleClass, setToggleClass] = useState("hidden");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Update the toggleClass state when the user logs in or out
  useEffect(() => {
    if (user) {
      setToggleClass("block");
    } else {
      setToggleClass("hidden");
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  let ticketsLink = "/tickets";
  if (user?.role === "Customer") {
    ticketsLink = "/customer-dashboard";
  } else if (user?.role === "Agent") {
    ticketsLink = "/agent-dashboard";
  } else if (user?.role === "Admin") {
    ticketsLink = "/admin-dashboard";
  }
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      <div className="md:hidden bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">Help Desk</h1>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="text-white p-3 rounded-md focus:outline-none"
        >
          <CiMenuFries className="h-6 w-6" />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        } bg-gray-800 text-white p-5 md:hidden`}
      >
        <Link
          to={ticketsLink}
          className="py-2 px-4 hover:bg-blue-700 rounded block mb-2"
          onClick={toggleMobileMenu}
        >
          Tickets
        </Link>
        <Link
          to="/customers"
          className="py-2 px-4 hover:bg-blue-700 rounded block"
          onClick={toggleMobileMenu}
        >
          Customers
        </Link>
        {user && (
          <button
            onClick={() => {
              handleLogout();
              toggleMobileMenu();
            }}
            className="py-2 px-4  hover:bg-blue-500 bg-blue-600 rounded mt-2 w-full"
          >
            Logout
          </button>
        )}
      </div>
      <div className="hidden md:flex flex-col bg-button text-white w-64">
        <div className="text-xl font-semibold mb-8 text-center border-b py-4">
          <h1 className="p-3">
            <Link to="/" className="flex items-center justify-center space-x-2">
              <span className="text-lg">Help Desk</span>
            </Link>
          </h1>
        </div>
        <Link
          to={ticketsLink}
          className="py-2 px-4 hover:bg-blue-700 rounded mb-2"
        >
          <span className="flex gap-2 items-center text-[18px]">
            <PiTicket />
            Tickets
          </span>
        </Link>
        <Link to="/customers" className="py-2 px-4 hover:bg-blue-700 rounded">
          <span className="flex gap-2 items-center text-[18px]">
            <CiUser />
            Customers
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className={`${toggleClass} py-2 px-4 hover:bg-blue-500 bg-blue-600 rounded mt-4 mx-4`}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
