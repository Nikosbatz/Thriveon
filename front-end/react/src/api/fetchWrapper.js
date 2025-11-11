import { Navigate } from "react-router-dom";
export async function fetchWrapper(uri, options) {
  const token = localStorage.getItem("token");
  // if user doesnt have a token redirect to Login Page
  if (!token) {
    window.location.href = "/auth/login";
    return;
  }

  const authOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(uri, authOptions);

  // if Server returns unauthorized status 401 then remove token and redirect to Login Page
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
    return res;
  }
  return res;
}
