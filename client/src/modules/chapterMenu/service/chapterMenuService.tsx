import { $authHost, $host } from "../../../http"
import { IChapter } from "../../../models/IChapter"
import { IComment } from "../../../models/IComment"
import { AppDispatch } from "../../../store"
import {
	addLikeChapter,
	addNewCommentChapter,
	deleteCommentChapter,
	incrementCountChapterComment,
	setChapters,
	setCommentsChapter,
	setCountChapter,
	setCountCommentChapter,
} from "../../../store/reducers/book/bookReducer"
import { IResponseChapter } from "../models/IResponseChapter"
import { IResponseComments } from "../models/IResponseComments"

export const getChapters =
	(bookId: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await $host.get<IResponseChapter>(
				`book/chapter?bookId=${bookId}`
			)
			dispatch(setChapters(response.data.rows))
			dispatch(setCountChapter(response.data.count))
		} catch (err) {}
	}

export const addChapterLike =
	(chapterId: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.patch<IChapter>(
				`book/chapter/like/${chapterId}`
			)
			dispatch(addLikeChapter(response.data))
		} catch (err) {}
	}

export const addCommentChapter =
	(chapterId: number, text: string) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.post<IComment>(`book/chapter/comment`, {
				chapterId,
				text,
			})
			dispatch(addNewCommentChapter(response.data))
			dispatch(incrementCountChapterComment())
		} catch (err) {}
	}
export const getCommentChapter =
	(chapterId: number, limit: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.get<IResponseComments>(
				`book/chapter/comment?chapterId=${chapterId}&limit=${limit}`
			)
			dispatch(setCommentsChapter(response.data.rows))
			dispatch(setCountCommentChapter(response.data.count))
		} catch (err) {}
	}

export const removeCommentChapter =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			await $authHost.delete(`book/chapter/comment/${id}`)
			dispatch(deleteCommentChapter(id))
		} catch (err) {}
	}
