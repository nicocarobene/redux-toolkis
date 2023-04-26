import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import userReducer, { roolbackUser, userWithId } from "./User/slice";

const persistanceMiddleware: Middleware = (store) => (next) => (action) => {
	//lo que hagamos antes del next se ejecutara antes de la accion.
	//ej: store.getState()--> 3 items
	next(action);
	//lo que hacemos desp es lo que queremos que haga desp de ejecutada la accion
	//store.getState() --> 2 items si la accion fue eliminar una cuenta
	localStorage.setItem("__redux__state", JSON.stringify(store.getState()));
	//la funcion de este middleware es que en cada accion, cualquiera sea actualice el localStorage para persistir la info de la store y no resetee al estado inicial cuando reinicia pag.
};

const syncWithDataBasaMiddlewate: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;
		console.log(type);
		const previousState = store.getState();
		next(action);
		if (type === "users/deleteUserById") {
			const userIdToRemove = payload;
			const userToRemove = previousState.users.find(
				(user: userWithId) => user.id === payload,
			);
			fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
				method: "DELETE",
			})
				.then((res) => {
					if (!res.ok) throw new Error("Error al eliminar el usuario");
					toast.success(`Usuario ${userIdToRemove} eliminado correctamente`);
				})
				.catch((e) => {
					toast.error(`Error deleting user ${userIdToRemove}`);
					if (userToRemove) store.dispatch(roolbackUser(userToRemove));
					console.log(e);
				});
		}
	};

export const store = configureStore({
	reducer: {
		//slice de nuestro store global para referirnos o trabajar en una parte especifica del store
		users: userReducer,
	},
	middleware: [persistanceMiddleware, syncWithDataBasaMiddlewate],
	//importante en el array ver el orden con el que se coloca ya que impieza el primero y continua con el siguiente
});

export type RootState = ReturnType<typeof store.getState>;
//es una funcion de ts, donde obtiene el tipo de dato de la raiz del state, basicamente le indicamos que retorne (returntype) el tipo de dato para useSelect de store.getState osea Reducer<userWithId[]>

export type AppDispatch = typeof store.dispatch;
