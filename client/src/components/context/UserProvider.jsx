import { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const userData = { user, setUser };
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};
