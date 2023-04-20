import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from 'sonner';
import userReducer, { roolbackUser, userWithId } from "./User/slice";

const persistanceMiddleware: Middleware= (store)=>(next)=> (action)=>{ 
    next(action)
    localStorage.setItem('__redux__state',JSON.stringify(store.getState()))
  }

  const syncWithDataBasaMiddlewate : Middleware = store => next => action =>{
    const { type, payload } = action 
    console.log(type)
    const previousState= store.getState()
    next(action)
    if(type === 'users/deleteUserById'){
        const userIdToRemove = payload
        const userToRemove= previousState.users.find((user : userWithId )=> user.id === payload)
        fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`)
            .then(res=> {
                if(res.ok) toast.success(`Usuario ${userIdToRemove} eliminado correctamente`)
                throw new Error ('Error al eliminar el usuario')
            })
            .catch(e=> {
                toast.error(`Error deleting user ${userIdToRemove}`)
                if(userToRemove) store.dispatch(roolbackUser(userToRemove))
                console.log(e)
            })
    }
  } 

export const store = configureStore({
    reducer:{
        users: userReducer,
    },
    middleware: [persistanceMiddleware, syncWithDataBasaMiddlewate]
})

export type RootState= ReturnType <typeof store.getState>
//es una funcion de redux o de ts, donde obtiene el tipo de dato de la raiz del state

export type AppDispatch = typeof store.dispatch