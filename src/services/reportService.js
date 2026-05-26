import authAPI from "./authService";

// MONTHLY REPORT
export const getMonthlyReport =
  async (

    year,

    month

  ) => {

    if (!year || !month) {

      throw new Error(
        "Year and month are required"
      );
    }

    const response =
      await authAPI.get(

        `/reports/monthly/${year}/${month}`
      );

    return response.data;
  };

// YEARLY REPORT
export const getYearlyReport =
  async (year) => {

    if (!year) {

      throw new Error(
        "Year is required"
      );
    }

    const response =
      await authAPI.get(
        `/reports/yearly/${year}`
      );

    return response.data;
  };