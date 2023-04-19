import { User, UserId, addNewUser, deleteUserById } from "../store/User/slice";
import { useAppDispatch } from "./store";

export default function useUserAction (){
    const dispatch = useAppDispatch()
    const addUser= ({name, email, github}: User)=>{
        dispatch(addNewUser({name,email,github}))
    }
    const removeUser = (id: UserId)=>{
        dispatch(deleteUserById(id))
    }
    
    return {addUser, removeUser}
}