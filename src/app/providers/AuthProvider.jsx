import { createContext, useContext, useEffect, useRef, useState } from "react";
import { checkLoggedIn, refresh, logoutAxiosRequest } from "../../api/auth.api";
import axiosInstance from "../../api/axiosInstance";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isRefreshing = useRef(false);
  const isInitialized = useRef(false);
  const confirmLogin = (username) => {
    setUser(username);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await logoutAxiosRequest();
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const fetchCurrentUser = async () => {
    const response = await checkLoggedIn();
    return response.data.username;
  };

  const refreshToken = async () => {
    console.log("REFRESHING TOKEN!!");
    await refresh();
    return fetchCurrentUser();
  };
  const initAuth = async () => {
    if (isInitialized.current) return;
    try {
      isInitialized.current = true;
      const username = await fetchCurrentUser();
      confirmLogin(username);
    } catch (error) {
      await logout();
      isInitialized.current = false;
    } finally {
      setIsLoading(false);
    }
  };
  // handling intercepting and initing
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (isRefreshing.current) return Promise.reject(error);

        if (originalRequest.url.includes("/refresh")) {
          await logout();
          return Promise.reject(error);
        }

        if (error?.response?.status === 401 && !originalRequest._retry) {
          isRefreshing.current = true;
          originalRequest._retry = true;

          try {
            await refresh();
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            await logout();
            return Promise.reject(refreshError);
          } finally {
            isRefreshing.current = false;
          }
        }

        return Promise.reject(error);
      },
    );
    initAuth();

    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    confirmLogin,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
