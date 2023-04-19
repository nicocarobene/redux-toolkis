import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/slice";


const persistanceMiddleware= (store)=>(next)=> (action)=>{ 
    next(action)
    localStorage.setItem('__redux__state',JSON.stringify(store.getState()))
  }

export const store = configureStore({
    reducer:{
        users: userReducer,
    },
    middleware: [persistanceMiddleware]
})

export type RootState= ReturnType <typeof store.getState>
//es una funcion de redux o de ts, donde obtiene el tipo de dato de la raiz del state

export type AppDispatch = typeof store.dispatch