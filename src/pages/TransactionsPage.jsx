import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  getTransactions,
  createTransaction,
  deleteTransaction,
} from "../services/transactionService";

import {
  getCategories,
} from "../services/categoryService";

function TransactionsPage() {

  const [transactions, setTransactions] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      amount: "",
      date: "",
      description: "",
      categoryId: "",
    });

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    fetchTransactions();

    fetchCategories();

  }, []);

  // =========================
  // FETCH TRANSACTIONS
  // =========================

  const fetchTransactions =
    async () => {

      try {

        setLoading(true);

        const data =
          await getTransactions();

        if (
          Array.isArray(data)
        ) {

          setTransactions(data);

        } else {

          setTransactions([]);
        }

      } catch (error) {

        console.log(
          "TRANSACTION ERROR:",
          error
        );

        setTransactions([]);

      } finally {

        setLoading(false);
      }
    };

  // =========================
  // FETCH CATEGORIES
  // =========================

  const fetchCategories =
    async () => {

      try {

        const data =
          await getCategories();

        console.log(
          "CATEGORIES:",
          data
        );

        if (
          Array.isArray(data)
        ) {

          setCategories(data);

        } else {

          setCategories([]);
        }

      } catch (error) {

        console.log(
          "CATEGORY ERROR:",
          error
        );

        setCategories([]);
      }
    };

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  // =========================
  // CREATE TRANSACTION
  // =========================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const payload = {

          amount:
            Number(
              formData.amount
            ),

          date:
            formData.date,

          description:
            formData.description,

          category: {

            id:
              Number(
                formData.categoryId
              ),
          },
        };

        console.log(
          "PAYLOAD:",
          payload
        );

        await createTransaction(
          payload
        );

        alert(
          "Transaction Added ✅"
        );

        setFormData({

          amount: "",

          date: "",

          description: "",

          categoryId: "",
        });

        fetchTransactions();

      } catch (error) {

        console.log(error);

        console.log(
          error?.response?.data
        );

        alert(
          error?.response?.data?.message ||
          "Transaction Failed ❌"
        );
      }
    };

  // =========================
  // DELETE TRANSACTION
  // =========================

  const handleDelete =
    async (id) => {

      try {

        await deleteTransaction(id);

        fetchTransactions();

      } catch (error) {

        console.log(error);

        alert(
          "Delete Failed ❌"
        );
      }
    };

  // =========================
  // FILTERED TRANSACTIONS
  // =========================

  const filteredTransactions =
    useMemo(() => {

      return transactions;

    }, [transactions]);

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-[#f6f3ff] via-[#f8f7ff] to-[#eef2ff]">

      <Sidebar />

      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">

        <Topbar
          title="Transactions"
          subtitle="Manage and track all your financial activity."
        />

        {/* ADD TRANSACTION */}

        <div className="bg-white rounded-3xl p-8 shadow-xl mb-10">

          <h2 className="text-3xl font-bold mb-6">

            Add Transaction

          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-2 gap-5"
          >

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="p-4 rounded-2xl border"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="p-4 rounded-2xl border"
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="p-4 rounded-2xl border"
            />

            {/* CATEGORY DROPDOWN */}

            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="p-4 rounded-2xl border"
            >

              <option value="">
                Select Category
              </option>

              {

                categories?.map(
                  (category) => (

                    <option
                      key={category.id}
                      value={category.id}
                    >

                      {category.name}
                      {" "}
                      (
                      {category.type}
                      )

                    </option>
                  )
                )
              }

            </select>

            <button
              type="submit"
              className="lg:col-span-2 bg-purple-600 text-white py-4 rounded-2xl font-bold"
            >

              Add Transaction

            </button>

          </form>

        </div>

        {/* TRANSACTION LIST */}

        <div className="bg-white rounded-3xl p-8 shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            Transactions

          </h2>

          {

            loading ? (

              <p>
                Loading...
              </p>

            ) : filteredTransactions.length === 0 ? (

              <p>
                No Transactions Found
              </p>

            ) : (

              <div className="space-y-4">

                {

                  filteredTransactions.map(
                    (transaction) => (

                      <div
                        key={transaction.id}
                        className="p-5 rounded-2xl bg-gray-100 flex justify-between"
                      >

                        <div>

                          <h3 className="font-bold text-lg">

                            {
                              transaction.description
                            }

                          </h3>

                          <p>

                            {
                              transaction.category?.name
                            }

                          </p>

                        </div>

                        <button
                          onClick={() =>
                            handleDelete(
                              transaction.id
                            )
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded-xl"
                        >

                          Delete

                        </button>

                      </div>
                    )
                  )
                }

              </div>
            )
          }

        </div>

      </div>

    </div>
  );
}

export default TransactionsPage;