import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";

import {
  getMonthlyReport,
  getYearlyReport,
} from "../services/reportService";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function ReportsPage() {

  const currentDate =
    new Date();

  const [reportType, setReportType] =
    useState("MONTHLY");

  const [month, setMonth] =
    useState(
      currentDate.getMonth() + 1
    );

  const [year, setYear] =
    useState(
      currentDate.getFullYear()
    );

  const [report, setReport] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // FETCH REPORTS
  const fetchReports =
    async () => {

      setLoading(true);

      setError("");

      try {

        let data;

        if (
          reportType === "MONTHLY"
        ) {

          data =
            await getMonthlyReport(
              year,
              month
            );

        } else {

          data =
            await getYearlyReport(
              year
            );
        }

        setReport(data);

      } catch (error) {

        console.log(error);

        setError(
          "Failed to load reports"
        );

        setReport(null);

      } finally {

        setLoading(false);
      }
    };

  // INITIAL LOAD
  useEffect(() => {

    fetchReports();

  }, [
    reportType,
    month,
    year,
  ]);

  // SAFE CHART DATA
  const chartData =
    useMemo(() => {

      if (!report)
        return [];

      return [
        {
          name: "Income",
          value:
            Number(
              report.totalIncome || 0
            ),
        },
        {
          name: "Expense",
          value:
            Number(
              report.totalExpense || 0
            ),
        },
        {
          name: "Savings",
          value:
            Math.max(
              0,
              Number(
                report.netSavings || 0
              )
            ),
        },
      ];

    }, [report]);

  const COLORS = [
    "#6D4AFF",
    "#EF4444",
    "#22C55E",
  ];

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-[#f6f3ff] via-[#f8f7ff] to-[#eef2ff]">

      <Sidebar />

      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">

        <Topbar
          title="Financial Reports"
          subtitle="Analyze your income, expenses and savings trends."
        />

        {/* CONTROLS */}

        <div className="bg-white/80 backdrop-blur-2xl rounded-[36px] p-8 border border-white/40 shadow-2xl mb-10">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>

              <h2 className="text-3xl font-black text-gray-900">

                Report Controls

              </h2>

              <p className="text-gray-500 mt-2">

                Customize your analytics view.

              </p>

            </div>

            <div className="flex flex-wrap gap-4">

              <select
                value={reportType}
                onChange={(e) =>
                  setReportType(
                    e.target.value
                  )
                }
                className="px-5 py-4 rounded-2xl border border-gray-200 outline-none"
              >

                <option value="MONTHLY">

                  Monthly

                </option>

                <option value="YEARLY">

                  Yearly

                </option>

              </select>

              {reportType ===
                "MONTHLY" && (

                <select
                  value={month}
                  onChange={(e) =>
                    setMonth(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="px-5 py-4 rounded-2xl border border-gray-200 outline-none"
                >

                  {Array.from(
                    { length: 12 },
                    (_, i) => (

                      <option
                        key={i + 1}
                        value={i + 1}
                      >

                        Month {i + 1}

                      </option>

                    )
                  )}

                </select>

              )}

              <input
                type="number"
                value={year}
                onChange={(e) =>
                  setYear(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="px-5 py-4 rounded-2xl border border-gray-200 outline-none w-[140px]"
              />

              <button
                onClick={fetchReports}
                className="px-5 py-4 rounded-2xl bg-[#6D4AFF] text-white font-semibold"
              >

                Refresh

              </button>

            </div>

          </div>

        </div>

        {/* ERROR */}

        {error && (

          <div className="mb-6 bg-red-100 text-red-600 p-4 rounded-2xl">

            {error}

          </div>

        )}

        {/* LOADING */}

        {loading ? (

          <div className="text-center py-20 text-2xl font-semibold text-gray-500">

            Loading Reports...

          </div>

        ) : report ? (

          <>

            {/* STATS */}

            <div className="grid lg:grid-cols-3 gap-6 mb-10">

              <StatCard
                title="Total Income"
                amount={`₹ ${Number(
                  report.totalIncome || 0
                ).toLocaleString()}`}
                color="text-green-600"
              />

              <StatCard
                title="Total Expense"
                amount={`₹ ${Number(
                  report.totalExpense || 0
                ).toLocaleString()}`}
                color="text-red-500"
              />

              <StatCard
                title="Net Savings"
                amount={`₹ ${Number(
                  report.netSavings || 0
                ).toLocaleString()}`}
                color="text-[#6D4AFF]"
              />

            </div>

            {/* CHARTS */}

            <div className="grid xl:grid-cols-2 gap-8">

              {/* PIE CHART */}

              <div className="bg-white/80 backdrop-blur-2xl rounded-[36px] p-8 border border-white/40 shadow-2xl h-[500px]">

                <h2 className="text-3xl font-black text-gray-900 mb-8">

                  Financial Distribution

                </h2>

                <ResponsiveContainer
                  width="100%"
                  height="80%"
                >

                  <PieChart>

                    <Pie
                      data={chartData}
                      dataKey="value"
                      outerRadius={140}
                      label
                    >

                      {chartData.map(
                        (
                          entry,
                          index
                        ) => (

                          <Cell
                            key={`cell-${index}`}
                            fill={
                              COLORS[
                                index %
                                  COLORS.length
                              ]
                            }
                          />

                        )
                      )}

                    </Pie>

                    <Tooltip />

                    <Legend />

                  </PieChart>

                </ResponsiveContainer>

              </div>

              {/* BAR CHART */}

              <div className="bg-white/80 backdrop-blur-2xl rounded-[36px] p-8 border border-white/40 shadow-2xl h-[500px]">

                <h2 className="text-3xl font-black text-gray-900 mb-8">

                  Financial Analytics

                </h2>

                <ResponsiveContainer
                  width="100%"
                  height="80%"
                >

                  <BarChart
                    data={chartData}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis
                      dataKey="name"
                    />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="value"
                      fill="#6D4AFF"
                      radius={[
                        10,
                        10,
                        0,
                        0,
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </>

        ) : (

          <div className="bg-white/80 backdrop-blur-2xl rounded-[36px] p-20 border border-white/40 shadow-2xl text-center">

            <div className="text-7xl mb-5">

              📉

            </div>

            <h3 className="text-4xl font-black text-gray-900">

              No Report Data

            </h3>

            <p className="text-gray-500 mt-4 text-lg">

              Add transactions to generate reports.

            </p>

          </div>

        )}

      </div>

    </div>

  );
}

export default ReportsPage;