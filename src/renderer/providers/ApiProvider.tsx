import axios from 'axios';
import { createContext, useMemo } from 'react';

const API_URL = 'http://localhost:4000';

// login
const login = async (values: { user: string; password: string }) => {
  return axios.post(`${API_URL}/login`, values);
};

const logout = async () => {
  return axios.post(`${API_URL}/logout`);
};

const isAuth = async () => {
  return axios.get(`${API_URL}/isAuth`);
};

// query
const query = async (sqlQuery: string) => {
  return axios.post(`${API_URL}/query`, { query: sqlQuery });
};

// create a context for the API URL
const ApiContext = createContext({
  API_URL,
  login,
  query,
  logout,
  isAuth,
});
function ApiProvider({ children }: any) {
  const apiValue = useMemo(
    () => ({
      API_URL,
      login,
      query,
      logout,
      isAuth,
    }),
    [],
  );

  return <ApiContext.Provider value={apiValue}>{children}</ApiContext.Provider>;
}

export { ApiProvider, ApiContext };
