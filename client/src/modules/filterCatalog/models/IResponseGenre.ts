import { Genre } from "../../../models/IGenre"

export interface IResponseGenre {
	count: number
	rows: Genre[]
}
