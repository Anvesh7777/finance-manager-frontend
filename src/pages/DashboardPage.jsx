import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";

import { getTransactions }
from "../services/transactionService";

function DashboardPage() {

  const [transactions, setTransactions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // FETCH TRANSACTIONS
  const fetchTransactions =
    async () => {

      try {

        setLoading(true);

        setError("");

        const data =
          await getTransactions();

        let transactionList = [];

        // SAFE ARRAY HANDLING
        if (
          Array.isArray(data)
        ) {

          transactionList =
            data;

        } else if (
          Array.isArray(
            data.transactions
          )
        ) {

          transactionList =
            data.transactions;
        }

        setTransactions(
          transactionList
        );

      } catch (error) {

        console.log(error);

        setError(
          "Failed to load dashboard"
        );

        setTransactions([]);

      } finally {

        setLoading(false);
      }
    };

  // INITIAL LOAD
  useEffect(() => {

    fetchTransactions();

  }, []);

  // SAFE ARRAY
  const safeTransactions =
    Array.isArray(transactions)
      ? transactions
      : [];

  // TOTAL INCOME
  const income =
    safeTransactions

      .filter(
        (item) =>

          item.category?.type ===
          "INCOME"
      )

      .reduce(

        (acc, item) =>

          acc +
          Number(
            item.amount || 0
          ),

        0
      );

  // TOTAL EXPENSES
  const expenses =
    safeTransactions

      .filter(
        (item) =>

          item.category?.type ===
          "EXPENSE"
      )

      .reduce(

        (acc, item) =>

          acc +
          Number(
            item.amount || 0
          ),

        0
      );

  // BALANCE
  const balance =
    income - expenses;

  // SAVINGS RATE
  const savingsRate =
    income > 0

      ? (

          ((income - expenses)
            / income) * 100

        ).toFixed(1)

      : 0;

  // RECENT TRANSACTIONS
  const recentTransactions =
    [...safeTransactions]

      .sort(

        (a, b) =>

          new Date(b.date)
          - new Date(a.date)
      )

      .slice(0, 5);

  // TOTAL TRANSACTIONS
  const totalTransactions =
    safeTransactions.length;

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-[#f6f3ff] via-[#f8f7ff] to-[#eef2ff]">

      <Sidebar />

      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">

        <Topbar
          title="Financial Dashboard"
          subtitle="Track your income, expenses and savings insights."
        />

        {/* REFRESH BUTTON */}

        <div className="flex justify-end mb-5">

          <button

            onClick={fetchTransactions}

            className="bg-[#6D4AFF] text-white px-5 py-3 rounded-2xl font-semibold hover:bg-[#5b3df5] transition"
          >

            Refresh Dashboard

          </button>

        </div>

        {/* ERROR */}

        {error && (

          <div className="mb-5 bg-red-100 text-red-600 p-4 rounded-2xl">

            {error}

          </div>
        )}

        {/* STATS */}

        <div className="grid lg:grid-cols-3 gap-6">

          <StatCard
            title="Total Balance"
            amount={`₹ ${balance.toLocaleString()}`}
            color="text-gray-900"
          />

          <StatCard
            title="Total Income"
            amount={`+ ₹ ${income.toLocaleString()}`}
            color="text-green-600"
          />

          <StatCard
            title="Total Expenses"
            amount={`- ₹ ${expenses.toLocaleString()}`}
            color="text-red-500"
          />

        </div>

        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-3 gap-6 mt-8">

          {/* RECENT ACTIVITY */}

          <div className="lg:col-span-2 bg-white/80 backdrop-blur-2xl rounded-[32px] border border-white/40 shadow-xl p-8">

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-3xl font-bold text-gray-900">

                  Recent Activity

                </h2>

                <p className="text-gray-500 mt-2">

                  Latest financial transactions

                </p>

              </div>

              <div className="bg-[#f3efff] text-[#6D4AFF] px-4 py-2 rounded-2xl font-semibold">

                {totalTransactions} Transactions

              </div>

            </div>

            {loading ? (

              <div className="space-y-4">

                {[1, 2, 3].map(
                  (item) => (

                    <div
                      key={item}
                      className="h-20 rounded-2xl bg-[#f5f5f5] animate-pulse"
                    />

                  )
                )}

              </div>

            ) : recentTransactions.length === 0 ? (

              <div className="flex flex-col items-center justify-center py-20 text-center">

                <div className="text-6xl mb-4">

                  💸

                </div>

                <h3 className="text-2xl font-bold text-gray-800">

                  No Transactions Yet

                </h3>

                <p className="text-gray-500 mt-2">

                  Start adding transactions to see your analytics.

                </p>

              </div>

            ) : (

              <div className="space-y-5">

                {recentTransactions.map(
                  (transaction) => (

                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-5 rounded-3xl bg-[#f8f7ff] hover:scale-[1.01] transition"
                    >

                      <div className="flex items-center gap-4">

                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                            transaction.category?.type ===
                            "INCOME"
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >

                          {transaction.category?.type ===
                          "INCOME"
                            ? "📈"
                            : "📉"}

                        </div>

                        <div>

                          <h3 className="font-bold text-lg text-gray-900">

                            {
                              transaction.description ||
                              "Transaction"
                            }

                          </h3>

                          <p className="text-gray-500">

                            {
                              transaction.category
                                ?.name
                            }

                          </p>

                        </div>

                      </div>

                      <div className="text-right">

                        <p
                          className={`text-xl font-bold ${
                            transaction.category?.type ===
                            "INCOME"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >

                          ₹ {
                            transaction.amount
                          }

                        </p>

                        <p className="text-sm text-gray-400 mt-1">

                          {
                            transaction.date
                          }

                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

          {/* SIDE CARD */}

          <div className="space-y-6">

            <div className="bg-gradient-to-br from-[#6D4AFF] to-[#8B5CFF] rounded-[32px] p-8 text-white shadow-2xl">

              <p className="text-lg opacity-80 mb-3">

                Savings Rate

              </p>

              <h2 className="text-5xl font-bold">

                {savingsRate}%

              </h2>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;