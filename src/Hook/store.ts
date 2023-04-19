import type { AppDispatch, RootState } from "../store";
import  { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux"

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector
//estamos renombrando el useSelector por useApp pero typandolo 

export const useAppDispatch: () => AppDispatch = useDispatch
