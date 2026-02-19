
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_AUTH;
const handleResponse = async (response) => {
  const text = await response.text(); 

  let data;
  try {data = JSON.parse(text);
  } catch (error) {data = { message: text }; }

  if (!response.ok) {
    return {success: false,message: data.message || "Something went wrong",
    };
  }
  return {success: true,data,
  };
};


export const signupUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    return await handleResponse(response);
  } catch (error) {
    throw new Error(
      error.message || "Unable to connect to server. Please try later.",
    );
  }
};

export const signinUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    return await handleResponse(response);
  } catch (error) {
    throw new Error(
      error.message || "Unable to connect to server. Please try later.",
    );
  }
};

export const forgotPassword = async (email) => {
  await fetch(`${API_BASE_URL}/forgotpassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = async (token, password) => {
  const res = await fetch(`${API_BASE_URL}/resetpassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      password,
    }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Reset failed");
  }
};
