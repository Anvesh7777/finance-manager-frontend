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

  const [search, setSearch] =
    useState("");

  const [filterType, setFilterType] =
    useState("ALL");

  const [formData, setFormData] =
    useState({
      amount: "",
      date: "",
      description: "",
      categoryId: "",
    });

  // INITIAL LOAD
  useEffect(() => {

    fetchTransactions();

    fetchCategories();

  }, []);

  // FETCH TRANSACTIONS
  const fetchTransactions =
    async () => {

      try {

        setLoading(true);

        const data =
          await getTransactions();

        let transactionArray = [];

        if (
          Array.isArray(data)
        ) {

          transactionArray =
            data;

        } else if (
          Array.isArray(
            data.transactions
          )
        ) {

          transactionArray =
            data.transactions;
        }

        transactionArray =
          transactionArray.filter(
            (transaction) =>
              transaction &&
              transaction.id
          );

        setTransactions(
          transactionArray
        );

      } catch (error) {

        console.log(error);

        setTransactions([]);

      } finally {

        setLoading(false);
      }
    };

  // FETCH CATEGORIES
  const fetchCategories =
    async () => {

      try {

        const data =
          await getCategories();

        if (
          Array.isArray(data)
        ) {

          setCategories(data);

        } else {

          setCategories([]);
        }

      } catch (error) {

        console.log(error);

        setCategories([]);
      }
    };

  // HANDLE INPUT CHANGE
  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  // CREATE TRANSACTION
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (
          Number(formData.amount) <= 0
        ) {

          alert(
            "Amount must be greater than 0"
          );

          return;
        }

        const selectedCategory =
          categories.find(
            (cat) =>
              cat.id ===
              Number(
                formData.categoryId
              )
          );

        if (!selectedCategory) {

          alert(
            "Please select category"
          );

          return;
        }

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
              selectedCategory.id,
          },
        };

        await createTransaction(
          payload
        );

        // REFRESH DATA
        await fetchTransactions();

        // RESET FORM
        setFormData({
          amount: "",
          date: "",
          description: "",
          categoryId: "",
        });

        alert(
          "Transaction Added Successfully ✅"
        );

      } catch (error) {

        console.log(error);

        console.log(
          error.response?.data
        );

        alert(
          error?.response?.data?.message ||
          "Failed to create transaction ❌"
        );
      }
    };

  // DELETE TRANSACTION
  const handleDelete =
    async (id) => {

      try {

        await deleteTransaction(id);

        // REFRESH AFTER DELETE
        await fetchTransactions();

      } catch (error) {

        console.log(error);

        alert(
          "Delete failed ❌"
        );
      }
    };

  // FILTER TRANSACTIONS
  const filteredTransactions =
    useMemo(() => {

      if (
        !Array.isArray(
          transactions
        )
      ) {

        return [];
      }

      return transactions.filter(
        (transaction) => {

          if (
            !transaction ||
            !transaction.id
          ) {

            return false;
          }

          const matchesSearch =
            (
              transaction.description ||
              ""
            )
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesType =
            filterType === "ALL"
              ? true
              : transaction.category
                  ?.type ===
                filterType;

          return (
            matchesSearch &&
            matchesType
          );
        }
      );

    }, [
      transactions,
      search,
      filterType,
    ]);

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-[#f6f3ff] via-[#f8f7ff] to-[#eef2ff]">

      <Sidebar />

      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">

        <Topbar
          title="Transactions"
          subtitle="Manage and track all your financial activity."
        />

        {/* ADD TRANSACTION */}

        <div className="bg-white/80 backdrop-blur-2xl rounded-[36px] p-8 border border-white/40 shadow-2xl mb-10">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold text-gray-900">

                Add Transaction

              </h2>

              <p className="text-gray-500 mt-2">

                Record your income and expenses.

              </p>

            </div>

            <div className="text-5xl">

              💸

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-2 gap-5"
          >

            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={
                formData.amount
              }
              onChange={
                handleChange
              }
              required
              className="p-5 rounded-3xl border border-gray-200 outline-none bg-white"
            />

            <input
              type="date"
              name="date"
              value={
                formData.date
              }
              onChange={
                handleChange
              }
              required
              className="p-5 rounded-3xl border border-gray-200 outline-none bg-white"
            />

            <input
              type="text"
              name="description"
              placeholder="Transaction Description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              required
              className="p-5 rounded-3xl border border-gray-200 outline-none bg-white"
            />

            <select
              name="categoryId"
              value={
                formData.categoryId
              }
              onChange={
                handleChange
              }
              required
              className="p-5 rounded-3xl border border-gray-200 outline-none bg-white"
            >

              <option value="">
                Select Category
              </option>

              {categories.map(
                (category) => (

                  <option
                    key={category.id}
                    value={category.id}
                  >

                    {category.name}

                  </option>

                )
              )}

            </select>

            <button
              type="submit"
              className="lg:col-span-2 py-5 rounded-3xl bg-gradient-to-r from-[#6D4AFF] to-[#8B5CFF] text-white text-lg font-bold hover:scale-[1.01] transition"
            >

              Add Transaction

            </button>

          </form>

        </div>

        {/* TRANSACTION HISTORY */}

        <div className="bg-white/80 backdrop-blur-2xl rounded-[36px] p-8 border border-white/40 shadow-2xl">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-bold text-gray-900">

              Transaction History

            </h2>

            <button
              onClick={fetchTransactions}
              className="px-5 py-3 rounded-2xl bg-[#6D4AFF] text-white font-semibold"
            >

              Refresh

            </button>

          </div>

          {loading ? (

            <p className="text-gray-500">

              Loading...

            </p>

          ) : filteredTransactions.length === 0 ? (

            <div className="text-center py-20">

              <div className="text-6xl mb-5">

                📭

              </div>

              <h3 className="text-3xl font-bold text-gray-800">

                No Transactions Found

              </h3>

            </div>

          ) : (

            <div className="space-y-5">

              {filteredTransactions.map(
                (transaction) => (

                  <div
                    key={transaction.id}
                    className="flex justify-between items-center p-6 rounded-3xl bg-[#f8f7ff]"
                  >

                    <div>

                      <h3 className="text-xl font-bold">

                        {
                          transaction.description ||
                          "Transaction"
                        }

                      </h3>

                      <p className="text-gray-500 mt-1">

                        {
                          transaction.category
                            ?.name ||
                          "No Category"
                        }

                        {" • "}

                        {
                          transaction.date ||
                          "No Date"
                        }

                      </p>

                    </div>

                    <div className="flex items-center gap-5">

                      <p
                        className={`text-2xl font-bold ${
                          transaction.category?.type ===
                          "INCOME"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >

                        ₹ {
                          transaction.amount || 0
                        }

                      </p>

                      <button
                        onClick={() =>
                          handleDelete(
                            transaction.id
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-red-500 text-white"
                      >

                        Delete

                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default TransactionsPage;