import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  registerUser,
} from "../services/authService";

function RegisterPage() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const navigate =
    useNavigate();

  // REDIRECT IF LOGGED IN
  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      navigate(
        "/dashboard"
      );
    }

  }, [navigate]);

  // HANDLE REGISTER
  const handleRegister =
    async (e) => {

      e.preventDefault();

      if (loading) return;

      setLoading(true);

      setError("");

      try {

        if (
          password.length < 6
        ) {

          setError(
            "Password must be at least 6 characters"
          );

          return;
        }

        await registerUser({

          name:
            name.trim(),

          email:
            email.trim()
              .toLowerCase(),

          password,
        });

        alert(
          "Registration Successful ✅"
        );

        navigate("/login");

      } catch (error) {

        console.log(error);

        const message =

          error?.response?.data
            ?.message ||

          "Registration Failed ❌";

        setError(message);

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen flex items-center justify-center px-6 bg-[#f7f4ff]">

      <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl rounded-[40px] p-10 shadow-2xl border border-white/50">

        <h1 className="text-5xl font-bold text-[#111827] mb-3">

          Create Account

        </h1>

        <p className="text-gray-500 mb-8 text-lg">

          Start managing your finances smarter.

        </p>

        {/* ERROR */}

        {error && (

          <div className="mb-5 bg-red-100 text-red-600 p-4 rounded-2xl">

            {error}

          </div>

        )}

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            required
            className="w-full p-5 rounded-2xl bg-white border border-gray-200 outline-none focus:border-purple-500 text-black"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
            className="w-full p-5 rounded-2xl bg-white border border-gray-200 outline-none focus:border-purple-500 text-black"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
            className="w-full p-5 rounded-2xl bg-white border border-gray-200 outline-none focus:border-purple-500 text-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-[#6D4AFF] text-white text-lg font-semibold hover:bg-[#5b3df5] transition shadow-xl shadow-purple-300 disabled:opacity-50"
          >

            {loading
              ? "Creating..."
              : "Create Account"}

          </button>

        </form>

        <p className="text-center text-gray-500 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-[#6D4AFF] font-semibold"
          >

            Login

          </Link>

        </p>

      </div>

    </div>
  );
}

export default RegisterPage;