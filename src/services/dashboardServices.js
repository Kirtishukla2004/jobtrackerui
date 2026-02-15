const API_BASE_URL = "http://localhost:5148/api/jobs";

export const getJobDashboardData = async (filters) => {
  const token = localStorage.getItem("jobtracker_token");

  const response = await fetch(`${API_BASE_URL}/getjobs`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response.json();
};

export const addJob = async (data) => {
  const token = localStorage.getItem("jobtracker_token");

  const response = await fetch(`${API_BASE_URL}/addjob`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to add job");
  }

  return await response.json(); 
};
export const getJobStatuses = async () => {
  const token = localStorage.getItem("jobtracker_token");

  const res = await fetch(`${API_BASE_URL}/statuses`, {
    headers: {
      method:"GET",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch job statuses");
  }

  return await res.json(); 
};
export const getCompanyLogo = async ()=>{

}
export const deleteJob = async (jobId) => {
  const token = localStorage.getItem("jobtracker_token");

  const res = await fetch(`${API_BASE_URL}/${jobId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete job");
};
