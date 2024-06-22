import { $authHost, $host } from "../../../http"
import { IBook } from "../../../models/IBook"
import { IChapterPage } from "../../../models/IChapterPage"
import { AppDispatch } from "../../../store"
import {
	addPage,
	editPage,
	removeChapterPages,
	setChapterPage,
	setCountChapterPage,
	setCurrentBook,
} from "../../../store/reducers/book/bookReducer"
import { IResponseChapterPage } from "../models/IResponseChapterPage"

export const getBook = (id: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $host.get<IBook>(`book/current?id=${id}`)
		dispatch(setCurrentBook(response.data))
	} catch (err) {}
}

export const getChapterPage = (id: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $host.get<IResponseChapterPage>(
			`book/chapter/page?chapterId=${id}`
		)
		dispatch(setChapterPage(response.data.rows))
		dispatch(setCountChapterPage(response.data.count))
	} catch (err) {}
}

export const deleteChapterPage =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.delete(`book/chapter/page/${id}`)
			dispatch(removeChapterPages(id))
		} catch (err) {}
	}

export const updateOrderPage =
	(id: number, order: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.patch<IChapterPage>(
				`book/chapter/page/`,
				{
					id,
					order,
				}
			)
			dispatch(editPage(response.data))
		} catch (err) {}
	}

export const createPage =
	(image: File, chapterId: number, order: number) =>
	async (dispatch: AppDispatch) => {
		try {
			const formData = new FormData()
			formData.append("image", image)
			formData.append("chapterId", chapterId.toString())
			formData.append("order", order.toString())

			const response = await $authHost.post<IChapterPage>(
				`book/chapter/page/`,
				formData
			)
			dispatch(addPage(response.data))
		} catch (err) {}
	}
