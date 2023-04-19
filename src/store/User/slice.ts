import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserId = string 

export interface User {
    name:string,
    email: string,
    github: string
}

export interface userWithId extends User{
    id: UserId
}

const DEFAULT_VALUE: userWithId[] = [
    {
      id: "1",
      name: "Peter Doe",
      email: "yasmanito@gmail.com",
      github: "yasmanito"
    },
    {
        id: "2",
        name: "Pedrito",
        email: "pedritoman@gmail.com",
        github: "pedrodev"
    },
    {
        id: "3",
        name: "Manuel",
        email: "manuelito@gmail.com",
        github: "manolitodev"
    },
    {
      id: "4",
      name: "Maximiliano",
      email: "maxicarobene@gmail.com",
      github: "nicocarobene"
    }
  ];

  const initialState : userWithId[]= (()=>{
    const persistedState= localStorage.getItem('__redux__state')
    return persistedState
      ? JSON.parse(persistedState).users
      : DEFAULT_VALUE
  })()

  //esto tiene nombre de ifi inmideatly 

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
      addNewUser: (state, action: PayloadAction<User>)=>{
        const id = crypto.randomUUID()
        return [...state, { id, ...action.payload}]
      } ,
      deleteUserById: (state, action: PayloadAction<UserId>)=>{
        const id = action.payload;
        return state.filter(user=> user.id !== id)
      }
    }
}
)

export default usersSlice.reducer
//lo unico que necesitamos importar es el reducer de este estado, ya que la store la obtenemos de provider

export const  { deleteUserById, addNewUser } = usersSlice.actions