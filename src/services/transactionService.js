import authAPI from "./authService";

// GET ALL TRANSACTIONS
export const getTransactions =
  async () => {

    const response =
      await authAPI.get(
        "/transactions"
      );

    return response.data;
  };

// CREATE TRANSACTION
export const createTransaction =
  async (transactionData) => {

    const response =
      await authAPI.post(

        "/transactions",

        transactionData
      );

    return response.data;
  };

// DELETE TRANSACTION
export const deleteTransaction =
  async (id) => {

    const response =
      await authAPI.delete(
        `/transactions/${id}`
      );

    return response.data;
  };

// UPDATE TRANSACTION
export const updateTransaction =
  async (

    id,

    updatedData

  ) => {

    const response =
      await authAPI.put(

        `/transactions/${id}`,

        updatedData
      );

    return response.data;
  };

// FILTER TRANSACTIONS
export const filterTransactions =
  async (

    startDate,

    endDate

  ) => {

    const response =
      await authAPI.get(

        `/transactions/filter?startDate=${startDate}&endDate=${endDate}`
      );

    return response.data;
  };