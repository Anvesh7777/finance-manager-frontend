function StatCard({

  title = "Title",

  amount = "₹ 0",

  color = "text-gray-900",

}) {

  return (

    <div className="bg-white/80 backdrop-blur-2xl rounded-[32px] p-8 border border-white/40 shadow-xl hover:translate-y-[-4px] transition duration-300">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-gray-500 text-lg mb-4">

            {title}

          </p>

          <h2
            className={`text-5xl font-bold ${color}`}
          >

            {amount}

          </h2>

        </div>

        <div className="w-14 h-14 rounded-2xl bg-[#f3efff] flex items-center justify-center text-2xl">

          💰

        </div>

      </div>

    </div>
  );
}

export default StatCard;