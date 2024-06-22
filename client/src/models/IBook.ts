import { IChapter } from "./IChapter"
import { Genre } from "./IGenre"
import { IBookComment } from "./IBookComment"

export interface IBook {
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
	chapters: IChapter[]
	book_comments: IBookComment[]
}
