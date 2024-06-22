import { IRole } from "./IRole"

export interface IUser {
	id: number
	email: string
	login: string
	roles: IRole[]
	ban: boolean
	banMessage: string | null
	image: string
	dateBirth: string
	name: string
	surname: string
	status: string
	placeWork: string
	phoneNumber: string
	telegram: string
	university: string
	faculty: string
	createdAt: string
	updatedAt: string
}
