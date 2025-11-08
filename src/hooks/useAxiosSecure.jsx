import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  // request interceptor

  // response interceptor
  useEffect(() => {
    // Add response interceptor
    const interceptor = axiosInstance.interceptors.response.use(response => {
      return response;
    }, async (error) => {

      if (error.response?.status === 401 || error.response?.status === 403) {
        try {
          await logOut();
        } finally {
          navigate('/login');
        }
      } else {
        console.error('axios err in interceptor response', error);
      }

      return Promise.reject(error);

    });

    // cleanup: remove interceptor when hook unmounts
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    }
  }, [logOut, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;