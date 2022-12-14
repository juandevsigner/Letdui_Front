import { useState, useEffect, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Provider, ValuePropsAuth } from "./interfacesContext";
import axiosClient from "../config/axiosClient";

const AuthContext = createContext({} as ValuePropsAuth);

const AuthProvider = ({ children }: Provider) => {
  const [auth, setAuth] = useState<any>();
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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
        if (data._id && location.pathname === "/") {
          navigate("/projects");
        }
      } catch (error) {
        setAuth({});
      }
      setLoad(false);
    };
    authUser();
  }, []);

  const LogoutAuth = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        load,
        setLoad,
        LogoutAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
