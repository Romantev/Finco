// import methods
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const nav = useNavigate();

  const [user, setUser] = useState(null);
  const [shouldRefetch, setRefetch] = useState(false);

  const refetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    axios
      .get("/api/users/secure")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((e) => {
        console.log("ERROR", e);
        setUser(null);
      });
  }, [shouldRefetch]);

  const logout = async () => {
    await axios.get("/api/users/logout");
    setUser(null);
    nav("/");
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn: !!user, refetch, logout }}>
      {children}
    </UserContext.Provider>
  );
};
