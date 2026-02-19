
const TOKEN_KEY = "jobtracker_token";
const EXPIRY_KEY = "jobtracker_expiry";
const USER_KEY = "jobtracker_user";
export const saveAuth = (data) => {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(EXPIRY_KEY, data.expiresAt);

  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      name: data.name,
      username: data.username,
    })
  );
};



export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isLoggedIn = () => {
  const token = getToken();
  const expiresAt = localStorage.getItem(EXPIRY_KEY);

  if (!token || !expiresAt) return false;
  return new Date(expiresAt) > new Date();
};
export const getUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
 //console.log(userStr);
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};
export const getUserEmail = () => {
  const user = getUser();
  return user?.username || null;
};


export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRY_KEY);
  localStorage.removeItem(USER_KEY);
};
