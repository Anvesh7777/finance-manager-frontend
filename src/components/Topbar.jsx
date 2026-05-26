function Topbar({

  title = "Dashboard",

  subtitle = "Welcome back",

}) {

  const username =

    localStorage.getItem(
      "username"
    ) || "User";

  const firstLetter =

    username
      .charAt(0)
      .toUpperCase();

  const today =
    new Date().toLocaleDateString(

      "en-IN",

      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  return (

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

      {/* LEFT */}

      <div>

        <p className="text-sm text-gray-500 mb-2">

          {today}

        </p>

        <h1 className="text-4xl font-bold text-gray-900">

          {title}

        </h1>

        <p className="text-gray-500 mt-2 text-lg">

          {subtitle}

        </p>

      </div>

      {/* RIGHT */}

      <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg rounded-3xl px-5 py-4 flex items-center gap-4">

        <div className="text-right">

          <p className="font-semibold text-gray-900 text-lg">

            {username}

          </p>

          <p className="text-sm text-gray-500">

            Personal Finance Manager

          </p>

        </div>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6D4AFF] to-[#8B5CFF] text-white flex items-center justify-center font-bold text-xl shadow-lg">

          {firstLetter}

        </div>

      </div>

    </div>
  );
}

export default Topbar;