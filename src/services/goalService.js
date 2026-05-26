import authAPI from "./authService";

// GET ALL GOALS
export const getGoals =
  async () => {

    const response =
      await authAPI.get(
        "/goals"
      );

    return response.data;
  };

// CREATE GOAL
export const createGoal =
  async (goalData) => {

    if (
      !goalData.goalName
    ) {

      throw new Error(
        "Goal name is required"
      );
    }

    if (
      !goalData.targetAmount
    ) {

      throw new Error(
        "Target amount is required"
      );
    }

    const response =
      await authAPI.post(

        "/goals",

        goalData
      );

    return response.data;
  };

// GET GOAL BY ID
export const getGoalById =
  async (id) => {

    const response =
      await authAPI.get(
        `/goals/${id}`
      );

    return response.data;
  };

// UPDATE GOAL
export const updateGoal =
  async (

    id,

    updatedData

  ) => {

    const response =
      await authAPI.put(

        `/goals/${id}`,

        updatedData
      );

    return response.data;
  };

// DELETE GOAL
export const deleteGoal =
  async (id) => {

    const response =
      await authAPI.delete(
        `/goals/${id}`
      );

    return response.data;
  };