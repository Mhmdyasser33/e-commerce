import React from "react";
import { AppState } from "./types";
import { ACTION } from "./action";
import { initialState } from "./dispatcher";
import {Store} from "./store" 
const reducer = (state : AppState , action : ACTION) =>{
    switch(action.type){
        case "SWITCH_MODE":
            return {mode : state.mode === 'dark' ? 'light' : 'dark'}
        default:
            return state;
    }
}

const StoreProvider = (props : React.PropsWithChildren)=>{
    const [state , dispatch] = React.useReducer<React.Reducer<AppState , ACTION>>(
     reducer , 
     initialState
      
    )
    return <Store.Provider  value={{state , dispatch}} {...props}/>
}

export { Store, StoreProvider}
