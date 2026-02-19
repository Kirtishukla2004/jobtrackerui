const API_URL = process.env.REACT_APP_API_BASE_URL_FEEDBACK;
export const submitFeedback = async ({ comment }) => {
  const token = localStorage.getItem("jobtracker_token");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment }),
  });

  const text = await response.text();
  console.log(text);
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
