import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  useContext,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

function Sidebar() {

  const location =
    useLocation();

  const { logout } =
    useContext(AuthContext);

  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },

    {
      name: "Transactions",
      path: "/transactions",
      icon: "💸",
    },

    {
      name: "Reports",
      path: "/reports",
      icon: "📊",
    },

    {
      name: "Goals",
      path: "/goals",
      icon: "🎯",
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },
  ];

  return (

    <div className="w-[280px] h-screen bg-white/80 backdrop-blur-2xl border-r border-white/40 p-7 flex flex-col justify-between shadow-2xl fixed left-0 top-0">

      {/* TOP */}

      <div>

        {/* LOGO */}

        <div className="mb-14">

          <h1 className="text-4xl font-black bg-gradient-to-r from-[#6D4AFF] to-[#8B5CFF] bg-clip-text text-transparent leading-tight">

            Finance
            <br />
            Manager

          </h1>

          <p className="text-gray-500 mt-4">

            Smart Personal Finance Tracker

          </p>

        </div>

        {/* MENU */}

        <div className="flex flex-col gap-4">

          {menuItems.map(
            (item) => (

              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-3xl transition-all duration-300 font-semibold text-lg ${
                  location.pathname ===
                  item.path

                    ? "bg-gradient-to-r from-[#6D4AFF] to-[#8B5CFF] text-white shadow-xl scale-[1.02]"

                    : "hover:bg-[#f4efff] text-gray-700"
                }`}
              >

                <span className="text-2xl">

                  {item.icon}

                </span>

                {item.name}

              </Link>

            )
          )}

        </div>

      </div>

      {/* LOGOUT */}

      <button
        onClick={logout}
        className="mt-10 px-5 py-4 rounded-3xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg hover:scale-[1.02] transition"
      >

        Logout

      </button>

    </div>
  );
}

export default Sidebar;import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  useContext,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

function Sidebar() {

  const location =
    useLocation();

  const { logout } =
    useContext(AuthContext);

  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },

    {
      name: "Transactions",
      path: "/transactions",
      icon: "💸",
    },

    {
      name: "Reports",
      path: "/reports",
      icon: "📊",
    },

    {
      name: "Goals",
      path: "/goals",
      icon: "🎯",
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },
  ];

  return (

    <div className="w-[280px] h-screen bg-white/80 backdrop-blur-2xl border-r border-white/40 p-7 flex flex-col justify-between shadow-2xl fixed left-0 top-0">

      {/* TOP */}

      <div>

        {/* LOGO */}

        <div className="mb-14">

          <h1 className="text-4xl font-black bg-gradient-to-r from-[#6D4AFF] to-[#8B5CFF] bg-clip-text text-transparent leading-tight">

            Finance
            <br />
            Manager

          </h1>

          <p className="text-gray-500 mt-4">

            Smart Personal Finance Tracker

          </p>

        </div>

        {/* MENU */}

        <div className="flex flex-col gap-4">

          {menuItems.map(
            (item) => (

              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-3xl transition-all duration-300 font-semibold text-lg ${
                  location.pathname ===
                  item.path

                    ? "bg-gradient-to-r from-[#6D4AFF] to-[#8B5CFF] text-white shadow-xl scale-[1.02]"

                    : "hover:bg-[#f4efff] text-gray-700"
                }`}
              >

                <span className="text-2xl">

                  {item.icon}

                </span>

                {item.name}

              </Link>

            )
          )}

        </div>

      </div>

      {/* LOGOUT */}

      <button
        onClick={logout}
        className="mt-10 px-5 py-4 rounded-3xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg hover:scale-[1.02] transition"
      >

        Logout

      </button>

    </div>
  );
}

export default Sidebar;