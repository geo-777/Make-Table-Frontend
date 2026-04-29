import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { checkLoggedIn, refresh, logoutAxiosRequest } from "../../api/auth.api";
import axiosInstance from "../../api/axiosInstance";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isRefreshing = useRef(false);
  const isInitialized = useRef(false);
  const refreshQueue = useRef([]);

  const processQueue = (error) => {
    refreshQueue.current.forEach(({ resolve, reject }) => {
      if (error) reject(error);
      else resolve();
    });
    refreshQueue.current = [];
  };

  const confirmLogin = useCallback((username) => {
    setUser(username);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutAxiosRequest();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setUser(null);
    }
  }, []);

  const fetchCurrentUser = async () => {
    const response = await checkLoggedIn();
    return response.data.username;
  };

  const refreshToken = async () => {
    await refresh();
    return fetchCurrentUser();
  };

  const initAuth = async () => {
    if (isInitialized.current) return;
    isInitialized.current = true;
    try {
      const username = await fetchCurrentUser();
      confirmLogin(username);
    } catch {
      try {
        const username = await refreshToken();
        confirmLogin(username);
      } catch {
        await logout();
        isInitialized.current = false;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const logoutRef = { current: logout };
    const confirmLoginRef = { current: confirmLogin };

    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url?.includes("/refresh")) {
          await logoutRef.current();
          return Promise.reject(error);
        }

        if (error?.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (isRefreshing.current) {
            return new Promise((resolve, reject) => {
              refreshQueue.current.push({ resolve, reject });
            })
              .then(() => axiosInstance(originalRequest))
              .catch((queueError) => Promise.reject(queueError));
          }

          isRefreshing.current = true;

          try {
            await refresh();
            processQueue(null);
            isRefreshing.current = false;
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError);
            isRefreshing.current = false;
            await logoutRef.current();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    logoutRef.current = logout;
    confirmLoginRef.current = confirmLogin;

    initAuth();

    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    confirmLogin,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
