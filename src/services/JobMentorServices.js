const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_AIAGENT;

export const InterviewAiAnswerFetch = async (interviewData) => {
  const token = localStorage.getItem("jobtracker_token");
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(interviewData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to submit interview data");
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(
      error.message || "Unable to connect to server. Please try later.",
    );
  }
};

export const fetchCategoryDDL = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categoriesddl`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    throw new Error(
      error.message || "Unable to fetch categories. Please try again.",
    );
  }
};
export const fetchQuestionTypeDDL = async (categoryId) => {
  try {
    if (!categoryId) {
      throw new Error("CategoryId is required");
    }

    const response = await fetch(
      `${API_BASE_URL}/questiontypesddl?categoryId=${categoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      if (response.status === 204) return []; 
      throw new Error("Failed to fetch question types");
    }  const data = await response.json();
   // console.log(data);
    return data;
  } catch (error) {
    throw new Error(
      error.message || "Unable to fetch question types. Please try again.",
    );
  }
};
