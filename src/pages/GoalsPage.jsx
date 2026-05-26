import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  getGoals,
  createGoal,
} from "../services/goalService";

function GoalsPage() {

  const [goals, setGoals] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      goalName: "",
      targetAmount: "",
      targetDate: "",
    });

  // FETCH GOALS
  const fetchGoals =
    async () => {

      try {

        setLoading(true);

        setError("");

        const data =
          await getGoals();

        if (
          Array.isArray(data)
        ) {

          setGoals(data);

        } else {

          setGoals([]);
        }

      } catch (error) {

        console.log(error);

        setError(
          "Failed to load goals"
        );

        setGoals([]);

      } finally {

        setLoading(false);
      }
    };

  // INITIAL LOAD
  useEffect(() => {

    fetchGoals();

  }, []);

  // HANDLE INPUT CHANGE
  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  // CREATE GOAL
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (
          Number(
            formData.targetAmount
          ) <= 0
        ) {

          alert(
            "Target amount must be greater than 0"
          );

          return;
        }

        const payload = {

          goalName:
            formData.goalName,

          targetAmount:
            Number(
              formData.targetAmount
            ),

          targetDate:
            formData.targetDate,
        };

        await createGoal(
          payload
        );

        // REFRESH GOALS
        await fetchGoals();

        // RESET FORM
        setFormData({
          goalName: "",
          targetAmount: "",
          targetDate: "",
        });

        alert(
          "Goal Created Successfully ✅"
        );

      } catch (error) {

        console.log(error);

        alert(
          error?.response?.data?.message ||
          "Failed to create goal ❌"
        );
      }
    };

  // TOTAL TARGET AMOUNT
  const totalGoalAmount =
    useMemo(() => {

      return goals.reduce(
        (acc, goal) =>

          acc +
          Number(
            goal.targetAmount || 0
          ),

        0
      );

    }, [goals]);

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-[#f6f3ff] via-[#f8f7ff] to-[#eef2ff]">

      <Sidebar />

      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">

        <Topbar
          title="Savings Goals"
          subtitle="Track and achieve your financial dreams."
        />

        {/* ERROR */}

        {error && (

          <div className="mb-6 bg-red-100 text-red-600 p-4 rounded-2xl">

            {error}

          </div>

        )}

        {/* TOP CARDS */}

        <div className="grid lg:grid-cols-3 gap-6 mb-10">

          <div className="bg-gradient-to-br from-[#6D4AFF] to-[#8B5CFF] rounded-[36px] p-8 text-white shadow-2xl">

            <p className="text-lg opacity-80 mb-4">

              Total Goals

            </p>

            <h2 className="text-5xl font-black">

              {goals.length}

            </h2>

          </div>

          <div className="bg-white/80 backdrop-blur-2xl rounded-[36px] p-8 border border-white/40 shadow-xl">

            <p className="text-gray-500 text-lg mb-4">

              Total Target Amount

            </p>

            <h2 className="text-5xl font-black text-[#6D4AFF]">

              ₹ {
                totalGoalAmount.toLocaleString()
              }

            </h2>

          </div>

          <div className="bg-white/80 backdrop-blur-2xl rounded-[36px] p-8 border border-white/40 shadow-xl">

            <p className="text-gray-500 text-lg mb-4">

              Financial Discipline

            </p>

            <h2 className="text-5xl font-black text-green-600">

              Strong 💪

            </h2>

          </div>

        </div>

        {/* CREATE GOAL */}

        <div className="bg-white/80 backdrop-blur-2xl rounded-[36px] p-8 border border-white/40 shadow-2xl mb-10">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold text-gray-900">

                Create New Goal

              </h2>

              <p className="text-gray-500 mt-2">

                Plan your future savings effectively.

              </p>

            </div>

            <div className="text-5xl">

              🎯

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-2 gap-5"
          >

            <input
              type="text"
              name="goalName"
              placeholder="Goal Name"
              value={
                formData.goalName
              }
              onChange={
                handleChange
              }
              required
              className="p-5 rounded-3xl border border-gray-200 outline-none"
            />

            <input
              type="number"
              name="targetAmount"
              placeholder="Target Amount"
              value={
                formData.targetAmount
              }
              onChange={
                handleChange
              }
              required
              className="p-5 rounded-3xl border border-gray-200 outline-none"
            />

            <input
              type="date"
              name="targetDate"
              value={
                formData.targetDate
              }
              onChange={
                handleChange
              }
              required
              className="p-5 rounded-3xl border border-gray-200 outline-none"
            />

            <button
              type="submit"
              className="lg:col-span-2 py-5 rounded-3xl bg-gradient-to-r from-[#6D4AFF] to-[#8B5CFF] text-white text-lg font-bold hover:scale-[1.01] transition"
            >

              Create Goal

            </button>

          </form>

        </div>

        {/* GOALS */}

        <div>

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold text-gray-900">

                Your Goals

              </h2>

              <p className="text-gray-500 mt-2">

                Monitor your financial journey.

              </p>

            </div>

            <button
              onClick={fetchGoals}
              className="px-5 py-3 rounded-2xl bg-[#6D4AFF] text-white font-semibold"
            >

              Refresh

            </button>

          </div>

          {loading ? (

            <p className="text-gray-500">

              Loading...

            </p>

          ) : goals.length === 0 ? (

            <div className="bg-white/80 backdrop-blur-2xl rounded-[36px] p-20 border border-white/40 shadow-xl text-center">

              <div className="text-7xl mb-5">

                🎯

              </div>

              <h3 className="text-4xl font-black text-gray-900">

                No Goals Yet

              </h3>

              <p className="text-gray-500 mt-4 text-lg">

                Create your first financial goal.

              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">

              {goals.map(
                (goal) => {

                  const progress =
                    Number(
                      goal.progressPercentage || 0
                    );

                  return (

                    <div
                      key={goal.id}
                      className="bg-white/80 backdrop-blur-2xl rounded-[36px] p-8 border border-white/40 shadow-2xl"
                    >

                      <div className="flex justify-between mb-6">

                        <div>

                          <h3 className="text-3xl font-black text-gray-900">

                            {
                              goal.goalName
                            }

                          </h3>

                          <p className="text-gray-500 mt-2">

                            Target:
                            {" "}
                            ₹ {
                              goal.targetAmount
                            }

                          </p>

                        </div>

                        <div className="text-5xl">

                          🚀

                        </div>

                      </div>

                      <div className="mb-5">

                        <div className="flex justify-between mb-3">

                          <span className="text-gray-500">

                            Progress

                          </span>

                          <span className="font-bold text-[#6D4AFF]">

                            {
                              progress.toFixed(0)
                            }%

                          </span>

                        </div>

                        <div className="h-4 rounded-full bg-[#ede7ff] overflow-hidden">

                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#6D4AFF] to-[#8B5CFF]"
                            style={{
                              width:
                                `${Math.min(progress, 100)}%`,
                            }}
                          />

                        </div>

                      </div>

                      <div className="space-y-3">

                        <div className="flex justify-between">

                          <span className="text-gray-500">

                            Current Progress

                          </span>

                          <span className="font-bold text-green-600">

                            ₹ {
                              Number(
                                goal.currentProgress || 0
                              ).toLocaleString()
                            }

                          </span>

                        </div>

                        <div className="flex justify-between">

                          <span className="text-gray-500">

                            Remaining

                          </span>

                          <span className="font-bold text-red-500">

                            ₹ {
                              Number(
                                goal.remainingAmount || 0
                              ).toLocaleString()
                            }

                          </span>

                        </div>

                        <div className="flex justify-between">

                          <span className="text-gray-500">

                            Deadline

                          </span>

                          <span className="font-semibold text-gray-900">

                            {
                              goal.targetDate
                            }

                          </span>

                        </div>

                      </div>

                    </div>

                  );
                }
              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default GoalsPage;