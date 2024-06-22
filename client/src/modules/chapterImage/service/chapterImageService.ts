import { $host } from "../../../http"
import { IBook } from "../../../models/IBook"
import { AppDispatch } from "../../../store"
import {
	setChapterPage,
	setCountChapterPage,
	setCurrentBook
} from "../../../store/reducers/book/bookReducer"
import { IResponseChapterPage } from "../models/IResponseChapterPage"

export const getChapterPage = (id: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $host.get<IResponseChapterPage>(
			`book/chapter/page?chapterId=${id}`
		)
		dispatch(setChapterPage(response.data.rows))
		dispatch(setCountChapterPage(response.data.count))
	} catch (err) {}
}


export const getBook = (id: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $host.get<IBook>(`book/current?id=${id}`)
		dispatch(setCurrentBook(response.data))
	} catch (err) {}
}
