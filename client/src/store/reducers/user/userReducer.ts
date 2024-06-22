import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { StateUser } from "./type"
import { IUser } from "../../../models/IUser"
import { IRole } from "../../../models/IRole"

const initialState: StateUser = {
	users: null,
	roles: null,
	count: 0,
}

const userReducer = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUsers(state, action: PayloadAction<IUser[]>) {
			state.users = action.payload
		},
		setCount(state, action: PayloadAction<number>) {
			state.count = action.payload
		},
		setRoles(state, action: PayloadAction<IRole[] | null>) {
			state.roles = action.payload
		},
	},
})

export default userReducer.reducer
export const { setCount, setUsers, setRoles } = userReducer.actions
