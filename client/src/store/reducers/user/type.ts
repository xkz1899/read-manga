import { IRole } from "../../../models/IRole"
import { IUser } from "../../../models/IUser"

export interface StateUser {
	users: IUser[] | null
	count: number
	roles: IRole[] | null
}
