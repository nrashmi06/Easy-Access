import { createContext, useContext } from "react";

export const SubjectContext = createContext("chemistry");

export const useSubject = () => useContext(SubjectContext);
