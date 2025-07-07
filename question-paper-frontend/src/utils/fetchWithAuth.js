import { store } from "../store/store";
import { setAccessTokenOnly } from "../store/authSlice";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

export async function fetchWithAuth(url, options = {}) {
  const token = store.getState().auth.accessToken;
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  console.log("accessToken in fetchWithAuth:", token);

  let response = await fetch(url, {
    ...options,
    headers,
  });

  if ([400, 401, 403].includes(response.status)) {
    return await handle401(url, options);
  }

  return response;
}

async function handle401(originalUrl, originalOptions) {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then(token => {
      const retryHeaders = {
        ...originalOptions.headers,
        Authorization: `Bearer ${token}`,
      };

      return fetch(originalUrl, {
        ...originalOptions,
        headers: retryHeaders,
      });
    });
  }

  isRefreshing = true;

  try {
    const refreshResponse = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!refreshResponse.ok) throw new Error("Refresh failed");

    const response = await refreshResponse.json();
    const newAccessToken = response.data.accessToken;

    console.log("New access token received:", newAccessToken);
    store.dispatch(setAccessTokenOnly(newAccessToken));
    processQueue(null, newAccessToken);

    const retryHeaders = {
      ...originalOptions.headers,
      Authorization: `Bearer ${newAccessToken}`,
    };

    return fetch(originalUrl, {
      ...originalOptions,
      headers: retryHeaders,
    });
  } catch (err) {
    processQueue(err, null);
    throw err;
  } finally {
    isRefreshing = false;
  }
}
