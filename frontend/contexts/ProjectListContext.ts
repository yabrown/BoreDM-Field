import React, { createContext } from "react";

type ProjectListContext = {
    projectList: project[],
    setProjectList: ((projectList: project[]) => void) | null
  }

export const ProjectListContext = createContext<ProjectListContext>({ projectList: [], setProjectList: null });