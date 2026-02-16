import { getToken } from "./authStorage";
const API_URL = "https://jobtrackerapi-0pfl.onrender.com/api/feedback/submit";

export const submitFeedback = async ({ comment }) => {
  const token = getToken();
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment }),
  });

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { message: text };
  }

  if (!response.ok) {
    return { success: false, message: data.message };
  }

  return { success: true, data };
};
