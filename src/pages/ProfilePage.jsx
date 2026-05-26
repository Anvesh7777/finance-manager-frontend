import Sidebar from "../components/Sidebar";

import Topbar from "../components/Topbar";

function ProfilePage() {

  const username =
    localStorage.getItem(
      "username"
    ) || "User";

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-[#f6f3ff] via-[#f8f7ff] to-[#eef2ff]">

      <Sidebar />

      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">

        <Topbar
          title="Profile"
          subtitle="Manage your account details."
        />

        <div className="bg-white/80 backdrop-blur-2xl rounded-[36px] p-10 border border-white/40 shadow-2xl max-w-3xl">

          <div className="flex items-center gap-6 mb-10">

            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#6D4AFF] to-[#8B5CFF] flex items-center justify-center text-white text-4xl font-bold">

              {
                username
                  .charAt(0)
                  .toUpperCase()
              }

            </div>

            <div>

              <h2 className="text-4xl font-black text-gray-900">

                {username}

              </h2>

              <p className="text-gray-500 mt-2 text-lg">

                Finance Manager User

              </p>

            </div>

          </div>

          {/* PROFILE DETAILS */}

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-[#f8f7ff] rounded-3xl p-6">

              <p className="text-gray-500 mb-2">

                Username

              </p>

              <h3 className="text-2xl font-bold text-gray-900">

                {username}

              </h3>

            </div>

            <div className="bg-[#f8f7ff] rounded-3xl p-6">

              <p className="text-gray-500 mb-2">

                Authentication

              </p>

              <h3 className="text-2xl font-bold text-green-600">

                JWT Secured 🔒

              </h3>

            </div>

            <div className="bg-[#f8f7ff] rounded-3xl p-6">

              <p className="text-gray-500 mb-2">

                Account Status

              </p>

              <h3 className="text-2xl font-bold text-[#6D4AFF]">

                Active

              </h3>

            </div>

            <div className="bg-[#f8f7ff] rounded-3xl p-6">

              <p className="text-gray-500 mb-2">

                Plan

              </p>

              <h3 className="text-2xl font-bold text-gray-900">

                Free Tier

              </h3>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;