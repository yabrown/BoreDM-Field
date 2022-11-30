import React, { createContext } from "react";

type loginContext = {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> | null
  }

export const LoginContext = createContext<loginContext>({isLoggedIn: false, setIsLoggedIn: null});