import { IUser } from "../../../models/IUser"

export interface IResponseUsers {
	count: number
	rows: IUser[]
}
