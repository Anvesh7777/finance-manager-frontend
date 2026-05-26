import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar() {

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem(
      "token"
    );

  return (

    <nav className="w-full flex justify-between items-center px-6 md:px-12 py-5 backdrop-blur-xl bg-white/60 border-b border-white/40 sticky top-0 z-50">

      {/* LOGO */}

      <Link
        to="/"
        className="text-2xl font-bold text-[#4F46E5]"
      >

        Finance Manager

      </Link>

      {/* LINKS */}

      <div className="flex items-center gap-4">

        {token ? (

          <button
            onClick={() =>
              navigate(
                "/dashboard"
              )
            }
            className="px-5 py-2.5 rounded-xl bg-[#6D4AFF] text-white font-semibold hover:bg-[#5b3df5] transition shadow-lg shadow-purple-200"
          >

            Dashboard

          </button>

        ) : (

          <>

            <Link
              to="/login"
              className="text-gray-700 font-medium hover:text-purple-600 transition"
            >

              Login

            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 rounded-xl bg-[#6D4AFF] text-white font-semibold hover:bg-[#5b3df5] transition shadow-lg shadow-purple-200"
            >

              Register

            </Link>

          </>

        )}

      </div>

    </nav>
  );
}

export default Navbar;