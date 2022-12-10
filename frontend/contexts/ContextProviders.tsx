import React, { createContext, useState } from 'react';
import { LoginContext } from './LoginContext';
import { ProjectListContext } from './ProjectListContext';
import { LogListContext } from './LogListContext';

export const ContextProviders = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [projectList, setProjectList] = useState<project[]>([]);
    const [logList, setLogList] = useState<log[]>([]);
    
    return (
      <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <ProjectListContext.Provider value={{projectList, setProjectList}}>
      <LogListContext.Provider value={{logList, setLogList}}>
        {children}
      </LogListContext.Provider>
      </ProjectListContext.Provider>
      </LoginContext.Provider>
      );
    }