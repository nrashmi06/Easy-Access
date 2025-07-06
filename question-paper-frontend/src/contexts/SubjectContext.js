import { createContext, useContext } from "react";

export const SubjectContext = createContext(null);

export const useSubject = () => useContext(SubjectContext);
