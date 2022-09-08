import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { Provider, ValueProps } from "./interfacesContext";
import axiosClient from "../config/axiosClient";

const AuthContext = createContext({} as ValueProps);

const AuthProvider = ({ children }: Provider) => {
  const [auth, setAuth] = useState<any>();
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoad(false);
        return;
      }
      const config: any = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axiosClient("/users/profile", config);
        setAuth(data);
        navigate("/projects");
      } catch (error) {
        setAuth({});
      }
      setLoad(false);
    };
    authUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        load,
        setLoad,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
