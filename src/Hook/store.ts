import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//UNICAMENTE RENOMBRAMOS Y TYPAMOS el useSelector para que no moleste TS y sepa que tipo de datos maneja nuestro estado

export const useAppDispatch: () => AppDispatch = useDispatch;
