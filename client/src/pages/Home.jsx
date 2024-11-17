import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1">
        <div className="min-h-screen bg-[url('/pattern.webp')] bg-cover shadow-md lg:shadow-none pt-4 flex lg:items-center justify-center">
          <div className="p-2 w-full">
            <h1 className="text-3xl lg:text-6xl font-bold text-center mb-6 lg:mb-8 text-h1">
              Welcome to Help Desk
            </h1>
            <p className="text-p mx-auto mb-6 lg:mb-8 max-w-screen-md text-center">
              Streamline customer support with our Helpdesk application,
              designed for customers, service agents, and admins to efficiently
              manage tickets, add notes, and update statuses.
            </p>
            <div className="flex justify-center space-x-4">
              {user ? (
                <p className="text-lg font-semibold text-center text-h1">
                  👋🏻 Hello, {user.role} !
                </p>
              ) : (
                <>
                  <a
                    className="bg-button text-white py-2 text-center px-6 basis-32 rounded-3xl hover:bg-blue-700 transition duration-300 shadow"
                    href="/login"
                  >
                    Login
                  </a>
                  <a
                    className="bg-button text-white py-2 text-center px-6 basis-32 rounded-3xl hover:bg-blue-700 transition duration-300 shadow"
                    href="/register"
                  >
                    Register
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
