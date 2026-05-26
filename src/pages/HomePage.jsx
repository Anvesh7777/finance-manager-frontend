import Navbar from "../components/Navbar";

import {
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

function HomePage() {

  const navigate =
    useNavigate();

  // AUTO REDIRECT IF LOGGED IN
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

  return (

    <div>

      <Navbar />

      {/* HERO */}

      <section className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 py-16 lg:py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">

              Smart Expense Tracking ✨

            </div>

            <h1 className="text-5xl lg:text-[68px] font-extrabold leading-tight text-gray-900">

              Manage Your <br />

              <span className="text-[#6D4AFF]">

                Money Better

              </span>

            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">

              Track expenses, monitor budgets,
              and organize your financial life
              with a beautifully designed dashboard.

            </p>

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-4 mt-10">

              {/* GET STARTED */}

              <button
                onClick={() =>
                  navigate("/register")
                }
                className="px-7 py-4 rounded-2xl bg-[#6D4AFF] text-white font-semibold shadow-xl shadow-purple-200 hover:scale-105 transition-all"
              >

                Get Started

              </button>

              {/* LEARN MORE */}

              <button
                onClick={() =>
                  window.scrollTo({
                    top:
                      document.body.scrollHeight,
                    behavior: "smooth",
                  })
                }
                className="px-7 py-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 font-semibold hover:bg-white transition"
              >

                Learn More

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="bg-white/60 backdrop-blur-2xl rounded-[32px] p-6 lg:p-8 shadow-2xl border border-white/40">

            {/* TOP */}

            <div className="flex items-start justify-between mb-8">

              <div>

                <p className="text-gray-500 text-sm">

                  Total Balance

                </p>

                <h2 className="text-4xl font-bold text-gray-900 mt-2">

                  ₹24,500

                </h2>

              </div>

              <div className="px-4 py-2 rounded-xl bg-green-100 text-green-600 font-semibold text-sm">

                +12.4%

              </div>

            </div>

            {/* TRANSACTIONS */}

            <div className="space-y-4">

              <div className="flex items-center justify-between p-5 rounded-2xl bg-[#f7f4ff]">

                <div>

                  <h3 className="font-semibold text-gray-900">

                    Grocery Shopping

                  </h3>

                  <p className="text-sm text-gray-500">

                    Food & Essentials

                  </p>

                </div>

                <p className="font-bold text-red-500">

                  - ₹1,240

                </p>

              </div>

              <div className="flex items-center justify-between p-5 rounded-2xl bg-[#f7f4ff]">

                <div>

                  <h3 className="font-semibold text-gray-900">

                    Salary Credit

                  </h3>

                  <p className="text-sm text-gray-500">

                    Monthly Income

                  </p>

                </div>

                <p className="font-bold text-green-600">

                  + ₹50,000

                </p>

              </div>

              <div className="flex items-center justify-between p-5 rounded-2xl bg-[#f7f4ff]">

                <div>

                  <h3 className="font-semibold text-gray-900">

                    Netflix Subscription

                  </h3>

                  <p className="text-sm text-gray-500">

                    Entertainment

                  </p>

                </div>

                <p className="font-bold text-red-500">

                  - ₹649

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 pb-24">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white/60 backdrop-blur-xl rounded-[28px] p-8 border border-white/40 shadow-xl">

            <h3 className="text-2xl font-bold text-gray-900 mb-4">

              Expense Tracking

            </h3>

            <p className="text-gray-600 leading-relaxed">

              Easily monitor your daily expenses
              and financial transactions.

            </p>

          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-[28px] p-8 border border-white/40 shadow-xl">

            <h3 className="text-2xl font-bold text-gray-900 mb-4">

              Budget Planning

            </h3>

            <p className="text-gray-600 leading-relaxed">

              Set monthly budgets and manage
              your spending smarter.

            </p>

          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-[28px] p-8 border border-white/40 shadow-xl">

            <h3 className="text-2xl font-bold text-gray-900 mb-4">

              Secure Authentication

            </h3>

            <p className="text-gray-600 leading-relaxed">

              JWT authentication keeps your
              financial data protected.

            </p>

          </div>

        </div>

      </section>

    </div>

  );
}

export default HomePage;