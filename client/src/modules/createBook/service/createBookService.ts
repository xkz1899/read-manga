import { $authHost, $host } from "../../../http"
import { Genre } from "../../../models/IGenre"
import { AppDispatch } from "../../../store"
import { setLoadingUploadBook } from "../../../store/reducers/book/bookReducer"
import {
	setCountGenres,
	setGenres,
} from "../../../store/reducers/catalog/catalogReducer"
import { IResponseBook } from "../models/IResponseBook"
import { IResponseGenre } from "../models/IResponseGenre"

export const createBook =
	(
		release_date: string,
		status: string,
		name: string,
		description: string,
		type: string,
		image: File,
		genres: Genre[]
	) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(setLoadingUploadBook(true))
			const formData = new FormData()
			formData.append("release_date", release_date)
			formData.append("status", status)
			formData.append("name", name)
			formData.append("description", description)
			formData.append("type", type)
			formData.append("image", image)

			const response = await $authHost.post<IResponseBook>("book/", formData)
			if (genres.length) {
				for (let i = 0; i < genres.length; i++) {
					await $authHost.post("book/connect", {
						genreId: genres[i].id,
						bookId: response.data.id,
					})
				}
			}
		} catch (err) {
		} finally {
			dispatch(setLoadingUploadBook(false))
			window.location.reload()
		}
	}

export const getGenres = () => async (dispatch: AppDispatch) => {
	try {
		const response = await $host.get<IResponseGenre>("book/genre")
		dispatch(setGenres(response.data.rows))
		dispatch(setCountGenres(response.data.count))
	} catch (err) {}
}

export const createGenre = async (name: string) => {
	try {
		await $authHost.post("book/genre", { name })
	} catch (err) {}
}
