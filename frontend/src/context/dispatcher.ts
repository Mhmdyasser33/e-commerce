import { ACTION } from "./action";
import { AppState } from "./types";


export const initialState : AppState = {
    mode : localStorage.getItem('mode')
    ? localStorage.getItem('mode')!
    : window.matchMedia && window.matchMedia('(prefers-color-scheme : dark)').matches
    ? 'dark' 
    : 'light'
}

export const defaultDispatch : React.Dispatch<ACTION> = ()=> initialState;