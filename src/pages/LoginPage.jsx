import {
  useState,
  useContext,
  useEffect,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  loginUser,
} from "../services/authService";

function LoginPage() {

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

  const { login } =
    useContext(AuthContext);

  // REDIRECT IF ALREADY LOGGED IN
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

  // HANDLE LOGIN
  const handleLogin =
    async (e) => {

      e.preventDefault();

      if (loading) return;

      setLoading(true);

      setError("");

      try {

        const response =
          await loginUser({

            email:
              email.trim()
                .toLowerCase(),

            password,
          });

        const token =
          response.token;

        if (!token) {

          setError(
            response.message ||
            "Login Failed ❌"
          );

          return;
        }

        // SAVE TOKEN
        login(token);

        // SAVE USERNAME
        localStorage.setItem(
          "username",
          email
        );

        alert(
          "Login Successful ✅"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        const message =

          error?.response?.data
            ?.message ||

          "Invalid Credentials ❌";

        setError(message);

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen flex items-center justify-center px-6 bg-[#f7f4ff]">

      <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl rounded-[40px] p-10 shadow-2xl border border-white/50">

        <h1 className="text-5xl font-bold text-[#111827] mb-3">

          Welcome Back

        </h1>

        <p className="text-gray-500 mb-8 text-lg">

          Login to continue managing your finances.

        </p>

        {/* ERROR */}

        {error && (

          <div className="mb-5 bg-red-100 text-red-600 p-4 rounded-2xl">

            {error}

          </div>

        )}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

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
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

        <p className="text-center text-gray-500 mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-[#6D4AFF] font-semibold"
          >

            Register

          </Link>

        </p>

      </div>

    </div>
  );
}

export default LoginPage;