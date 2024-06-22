import { IRole } from "./IRole"

export interface IUser {
	id: number
	email: string
	login: string
	roles: IRole[]
	ban: boolean
	ban_message: string | null
	image: string
	date_birth: string
	name: string
	surname: string
	createdAt: string
	updatedAt: string
}
