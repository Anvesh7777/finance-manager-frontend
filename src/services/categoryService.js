import authAPI from "./authService";

// GET ALL CATEGORIES
export const getCategories =
  async () => {

    const response =
      await authAPI.get(
        "/categories"
      );

    return response.data;
  };

// CREATE CATEGORY
export const createCategory =
  async (categoryData) => {

    if (
      !categoryData.name
    ) {

      throw new Error(
        "Category name is required"
      );
    }

    if (
      !categoryData.type
    ) {

      throw new Error(
        "Category type is required"
      );
    }

    const response =
      await authAPI.post(

        "/categories",

        categoryData
      );

    return response.data;
  };

// GET CATEGORY BY ID
export const getCategoryById =
  async (id) => {

    const response =
      await authAPI.get(
        `/categories/${id}`
      );

    return response.data;
  };