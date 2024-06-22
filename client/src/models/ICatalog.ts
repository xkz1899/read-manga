import { Genre } from "./IGenre"

export interface IResponseCatalog {
	count: number
	rows: ICatalog[]
}

export interface ICatalog {
	id: number
	release_date: string
	image: string
	status: string
	name: string
	description: string
	type: string
	likes: number
	createdAt: string
	updatedAt: string
	userId: number
	genres: Genre[]
}
