import { IComment } from "../../../models/IComment"

export interface IResponseComments {
	count: number
	rows: IComment[]
}
