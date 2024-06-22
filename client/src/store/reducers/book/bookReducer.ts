import { createSlice } from "@reduxjs/toolkit"

import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import { IBook } from "../../../models/IBook"
import { IChapter } from "../../../models/IChapter"
import { IChapterPage } from "../../../models/IChapterPage"
import { BookState } from "./type"
import { IComment } from "../../../models/IComment"

const initialState: BookState = {
	currentBook: null,
	chapterPages: null,
	countChapterPage: 0,
	chapters: null,
	countChapter: 0,
	isLoadingUploadBook: false,
	commentsBook: null,
	countCommentBook: 0,
	commentsChapter: null,
	countCommentChapter: 0,
	checkRecommendation: false,
}

const bookReducer = createSlice({
	name: "book",
	initialState,
	reducers: {
		setCurrentBook(state, action: PayloadAction<IBook>) {
			state.currentBook = action.payload
		},
		setChapterPage(state, action: PayloadAction<IChapterPage[] | null>) {
			state.chapterPages = action.payload
		},
		setCountChapterPage(state, action: PayloadAction<number>) {
			state.countChapterPage = action.payload
		},
		setChapters(state, action: PayloadAction<IChapter[] | null>) {
			state.chapters = action.payload
		},
		setCountChapter(state, action: PayloadAction<number>) {
			state.countChapter = action.payload
		},
		setLoadingUploadBook(state, action: PayloadAction<boolean>) {
			state.isLoadingUploadBook = action.payload
		},
		addChapter(state, action: PayloadAction<IChapter>) {
			state.currentBook?.chapters.unshift(action.payload)
		},
		addPage(state, action: PayloadAction<IChapterPage>) {
			state.chapterPages?.push(action.payload)
		},
		removeChapterPages(state, action: PayloadAction<number>) {
			if (state.chapterPages) {
				state.chapterPages = state.chapterPages?.filter(
					f => f.id !== action.payload
				)
			}
		},
		addLikeChapter(state, action: PayloadAction<IChapter>) {
			if (state.chapters) {
				state.chapters.find(f => f.id === action.payload.id)!.likes =
					action.payload.likes
			}
		},
		addLikeChapterBook(state, action: PayloadAction<IChapter>) {
			if (state.currentBook) {
				state.currentBook.chapters.find(
					f => f.id === action.payload.id
				)!.likes = action.payload.likes
			}
		},
		setCommentsBook(state, action: PayloadAction<IComment[] | null>) {
			state.commentsBook = action.payload
		},
		setCountCommentBook(state, action: PayloadAction<number>) {
			state.countCommentBook = action.payload
		},
		addNewCommentBook(state, action: PayloadAction<IComment>) {
			state.commentsBook?.unshift(action.payload)
		},
		deleteCommentBook(state, action: PayloadAction<number>) {
			if (state.commentsBook) {
				state.commentsBook = state.commentsBook?.filter(
					f => f.id !== action.payload
				)
			}
		},
		setCommentsChapter(state, action: PayloadAction<IComment[] | null>) {
			state.commentsChapter = action.payload
		},
		setCountCommentChapter(state, action: PayloadAction<number>) {
			state.countCommentChapter = action.payload
		},
		addNewCommentChapter(state, action: PayloadAction<IComment>) {
			state.commentsChapter?.unshift(action.payload)
		},
		deleteCommentChapter(state, action: PayloadAction<number>) {
			if (state.commentsChapter) {
				state.commentsChapter = state.commentsChapter?.filter(
					f => f.id !== action.payload
				)
			}
		},
		incrementCountChapterComment(state) {
			state.countCommentChapter += 1
		},
		incrementCountBookComment(state) {
			state.countCommentBook += 1
		},
		deleteGenreBook(state, action: PayloadAction<number>) {
			if (state.currentBook) {
				state.currentBook.genres = state.currentBook?.genres.filter(
					f => f.book_genre.id !== action.payload
				)
			}
		},
		deleteChapter(state, action: PayloadAction<number>) {
			if (state.currentBook) {
				state.currentBook.chapters = state.currentBook.chapters.filter(
					f => f.id !== action.payload
				)
			}
		},
		editPage(state, action: PayloadAction<IChapterPage>) {
			if (state.chapterPages) {
				state.chapterPages.find(f => f.id === action.payload.id)!.order =
					action.payload.order
				state.chapterPages = state.chapterPages.sort(
					(a, b) => a.order - b.order
				)
			}
		},
		setCheckRecommendation(state, action: PayloadAction<boolean>) {
			state.checkRecommendation = action.payload
		},
	},
})

export default bookReducer.reducer
export const {
	setCurrentBook,
	setChapterPage,
	setCountChapterPage,
	setChapters,
	setCountChapter,
	setLoadingUploadBook,
	addChapter,
	removeChapterPages,
	addPage,
	addLikeChapter,
	addLikeChapterBook,
	setCommentsBook,
	setCountCommentBook,
	addNewCommentBook,
	deleteCommentBook,
	addNewCommentChapter,
	deleteCommentChapter,
	setCommentsChapter,
	setCountCommentChapter,
	incrementCountBookComment,
	incrementCountChapterComment,
	deleteGenreBook,
	deleteChapter,
	editPage,
	setCheckRecommendation,
} = bookReducer.actions
