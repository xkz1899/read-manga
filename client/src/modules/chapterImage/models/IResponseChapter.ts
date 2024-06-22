import { IChapter } from "../../../models/IChapter"

export interface IResponseChapter {
	rows: IChapter[]
	count: number
}
