import { configureStore } from "@reduxjs/toolkit"

import { authReducer } from "../modules/authorization"
import bookReducer from "./reducers/book/bookReducer"
import catalogReducer from "./reducers/catalog/catalogReducer"
import userReducer from "./reducers/user/userReducer"

export const store = configureStore({
	reducer: {
		authReducer,
		catalogReducer,
		bookReducer,
		userReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
