import { IUser } from "../../../modules/authorization/models/IUser"

export interface AuthState {
	isAuth: boolean
	currentUser: IUser | null
	isLoading: boolean
	error: string | null
	isVisibleError: boolean
}
