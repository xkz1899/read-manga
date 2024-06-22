import { $authHost, $host } from "../../../http"
import { IBook } from "../../../models/IBook"
import { IChapter } from "../../../models/IChapter"
import { Genre } from "../../../models/IGenre"
import { IRecommendation } from "../../../models/IRecommendation"
import { AppDispatch } from "../../../store"
import {
	addChapter,
	addLikeChapterBook,
	addNewCommentBook,
	deleteChapter,
	deleteCommentBook,
	deleteGenreBook,
	incrementCountBookComment,
	setCheckRecommendation,
	setCommentsBook,
	setCountCommentBook,
	setCurrentBook,
} from "../../../store/reducers/book/bookReducer"
import {
	addRecommendation,
	deleteRecommendation,
	setCountGenres,
	setGenres,
} from "../../../store/reducers/catalog/catalogReducer"
import { IComment } from "../models/IComment"
import { IResponseComments } from "../models/IResponseComments"
import { IResponseGenre } from "../models/IResponseGenre"

export const getBook = (id: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $host.get<IBook>(`book/current?id=${id}`)
		dispatch(setCurrentBook(response.data))
	} catch (err) {}
}

export const createChapter =
	(name: string, order: string, id: string) =>
	async (dispatch: AppDispatch) => {
		try {
			const formData = new FormData()
			formData.append("name", name)
			formData.append("order", order)
			formData.append("bookId", id)

			const response = await $authHost.post<IChapter>("book/chapter", formData)
			dispatch(addChapter(response.data))
		} catch (err) {}
	}
export const addChapterLike =
	(chapterId: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.patch<IChapter>(
				`book/chapter/like/${chapterId}`
			)
			dispatch(addLikeChapterBook(response.data))
			dispatch(incrementCountBookComment())
		} catch (err) {}
	}

export const addCommentBook =
	(bookId: number, text: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.post<IComment>(`book/comment`, {
				bookId,
				text,
			})
			dispatch(addNewCommentBook(response.data))
			dispatch(incrementCountBookComment())
		} catch (err) {}
	}
export const getCommentBook =
	(bookId: number, page: number, limit: number) =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.get<IResponseComments>(
				`book/comment?bookId=${bookId}&page=${page}&limit=${limit}`
			)
			dispatch(setCommentsBook(response.data.rows))
			dispatch(setCountCommentBook(response.data.count))
		} catch (err) {}
	}
export const removeCommentBook =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.delete(`book/comment/${id}`)
			dispatch(deleteCommentBook(id))
		} catch (err) {}
	}
export const removeGenreBook =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.delete(`book/connect/${id}`)
			dispatch(deleteGenreBook(id))
		} catch (err) {}
	}

export const getGenre = () => async (dispatch: AppDispatch) => {
	try {
		const response = await $host.get<IResponseGenre>("book/genre?")
		dispatch(setGenres(response.data.rows))
		dispatch(setCountGenres(response.data.count))
	} catch (err) {}
}

export const addGenreToBook = async (genres: Genre[], id: number) => {
	try {
		if (genres.length) {
			for (let i = 0; i < genres.length; i++) {
				await $authHost.post("book/connect", {
					genreId: genres[i].id,
					bookId: id,
				})
			}
		}
	} catch (err) {
	} finally {
		window.location.reload()
	}
}

export const destroyChapter = (id: number) => async (dispatch: AppDispatch) => {
	try {
		await $authHost.delete(`book/chapter/${id}`)
		dispatch(deleteChapter(id))
	} catch (err) {}
}

export const editChapter =
	(id: number, name: string, order: number) =>
	async (dispatch: AppDispatch) => {
		try {
			await $authHost.post(`book/chapter/edit`, { id, name, order })
		} catch (err) {
		} finally {
			window.location.reload()
		}
	}
export const deleteBook = (id: number) => async (dispatch: AppDispatch) => {
	try {
		await $authHost.delete(`book/${id}`)
	} catch (err) {
	} finally {
		window.location.reload()
	}
}

export const editBook =
	(
		id: number,
		name: string,
		description: string,
		type: string,
		status: string,
		release_date: number
	) =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.patch<IBook>("book/", {
				id,
				name,
				description,
				type,
				status,
				release_date,
			})
			dispatch(setCurrentBook(response.data))
		} catch (err) {}
	}

export const checkRecommendationBook =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.get(`book/recommendation/check?id=${id}`)
			if (response.data) {
				dispatch(setCheckRecommendation(true))
			} else {
				dispatch(setCheckRecommendation(false))
			}
		} catch (err) {}
	}
export const addRecommendationBook =
	(bookId: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.post<IRecommendation>(
				`book/recommendation`,
				{ bookId }
			)
			dispatch(addRecommendation(response.data))
			dispatch(setCheckRecommendation(true))
		} catch (err) {}
	}

export const removeRecommendationBook =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.delete(`book/recommendation/${id}`)
			dispatch(deleteRecommendation(id))
			dispatch(setCheckRecommendation(false))
		} catch (err) {}
	}
