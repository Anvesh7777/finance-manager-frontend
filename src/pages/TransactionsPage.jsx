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
  createCategory,
} from "../services/categoryService";

function TransactionsPage() {

  // =========================
  // STATES
  // =========================

  const [transactions, setTransactions] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // TRANSACTION FORM

  const [formData, setFormData] =
    useState({

      amount: "",

      date: "",

      description: "",

      categoryId: "",
    });

  // CATEGORY FORM

  const [categoryForm, setCategoryForm] =
    useState({

      name: "",

      type: "EXPENSE",
    });

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    loadData();

  }, []);

  const loadData =
    async () => {

      await Promise.all([

        fetchTransactions(),

        fetchCategories(),
      ]);
    };

  // =========================
  // FETCH TRANSACTIONS
  // =========================

  const fetchTransactions =
    async () => {

      try {

        setLoading(true);

        const data =
          await getTransactions();

        console.log(
          "TRANSACTIONS:",
          data
        );

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
  // HANDLE TRANSACTION INPUT
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
  // HANDLE CATEGORY INPUT
  // =========================

  const handleCategoryChange =
    (e) => {

      setCategoryForm({

        ...categoryForm,

        [e.target.name]:
          e.target.value,
      });
    };

  // =========================
  // CREATE CATEGORY
  // =========================

  const handleCreateCategory =
    async (e) => {

      e.preventDefault();

      try {

        if (
          !categoryForm.name
        ) {

          alert(
            "Category name required"
          );

          return;
        }

        await createCategory({

          name:
            categoryForm.name,

          type:
            categoryForm.type,
        });

        alert(
          "Category Added ✅"
        );

        // RESET

        setCategoryForm({

          name: "",

          type: "EXPENSE",
        });

        // REFRESH DROPDOWN

        await fetchCategories();

      } catch (error) {

        console.log(
          error
        );

        alert(
          error?.response?.data?.message ||
          "Failed to create category ❌"
        );
      }
    };

  // =========================
  // CREATE TRANSACTION
  // =========================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (
          !formData.categoryId
        ) {

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

        // RESET

        setFormData({

          amount: "",

          date: "",

          description: "",

          categoryId: "",
        });

        fetchTransactions();

      } catch (error) {

        console.log(
          error
        );

        alert(
          error?.response?.data?.message ||
          "Failed to add transaction ❌"
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

        console.log(
          error
        );

        alert(
          "Delete failed ❌"
        );
      }
    };

  // =========================
  // FILTERED TRANSACTIONS
  // =========================

  const filteredTransactions =
    useMemo(() => {

      if (
        !Array.isArray(
          transactions
        )
      ) {

        return [];
      }

      return transactions;

    }, [transactions]);

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-[#f6f3ff] via-[#f8f7ff] to-[#eef2ff]">

      <Sidebar />

      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">

        <Topbar
          title="Transactions"
          subtitle="Manage all your transactions and categories."
        />

        {/* ========================= */}
        {/* ADD CATEGORY */}
        {/* ========================= */}

        <div className="bg-white rounded-[30px] p-8 shadow-xl mb-10">

          <h2 className="text-2xl font-bold mb-6">

            Add Category

          </h2>

          <form
            onSubmit={
              handleCreateCategory
            }
            className="grid lg:grid-cols-3 gap-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Category Name"
              value={
                categoryForm.name
              }
              onChange={
                handleCategoryChange
              }
              required
              className="p-5 rounded-3xl border"
            />

            <select
              name="type"
              value={
                categoryForm.type
              }
              onChange={
                handleCategoryChange
              }
              className="p-5 rounded-3xl border"
            >

              <option value="EXPENSE">
                EXPENSE
              </option>

              <option value="INCOME">
                INCOME
              </option>

            </select>

            <button
              type="submit"
              className="bg-[#6D4AFF] text-white rounded-3xl font-bold"
            >

              Add Category

            </button>

          </form>

        </div>

        {/* ========================= */}
        {/* ADD TRANSACTION */}
        {/* ========================= */}

        <div className="bg-white rounded-[30px] p-8 shadow-xl mb-10">

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
              className="p-5 rounded-3xl border"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="p-5 rounded-3xl border"
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="p-5 rounded-3xl border"
            />

            {/* CATEGORY */}

            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="p-5 rounded-3xl border"
            >

              <option value="">
                Select Category
              </option>

              {

                categories.map(
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
              className="lg:col-span-2 py-5 rounded-3xl bg-gradient-to-r from-[#6D4AFF] to-[#8B5CFF] text-white text-lg font-bold"
            >

              Add Transaction

            </button>

          </form>

        </div>

        {/* ========================= */}
        {/* TRANSACTIONS */}
        {/* ========================= */}

        <div className="bg-white rounded-[30px] p-8 shadow-xl">

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
                        className="p-5 rounded-2xl bg-gray-100 flex justify-between items-center"
                      >

                        <div>

                          <h3 className="font-bold">

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

                        <div className="flex items-center gap-4">

                          <p className="font-bold text-xl">

                            ₹
                            {
                              transaction.amount
                            }

                          </p>

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