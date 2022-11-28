import React, { createContext } from "react";

type userContext = {
    user: user,
    setUser: React.Dispatch<React.SetStateAction<user>> | null
  }

export const UserContext = createContext<userContext>({user: null, setUser: null});