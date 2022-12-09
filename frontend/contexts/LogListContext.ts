import React, { createContext } from "react";

type LogListContext = {
    logList: log[],
    setLogList: ((projectList: log[]) => void) | null
  }

export const LogListContext = createContext<LogListContext>({ logList: [], setLogList: null });