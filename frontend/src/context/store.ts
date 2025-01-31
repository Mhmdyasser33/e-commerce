import { createContext } from "react";
import { defaultDispatch, initialState } from "./dispatcher";

export const Store = createContext({
    state : initialState , 
    dispatch : defaultDispatch 
})
