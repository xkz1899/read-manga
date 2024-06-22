import { IBook } from "../../../models/IBook"
import { IChapter } from "../../../models/IChapter"
import { IChapterPage } from "../../../models/IChapterPage"
import { IComment } from "../../../models/IComment"

export interface BookState {
	currentBook: IBook | null
	chapterPages: IChapterPage[] | null
	countChapterPage: number
	chapters: IChapter[] | null
	countChapter: number
	isLoadingUploadBook: boolean
	commentsBook: IComment[] | null
	countCommentBook: number
	commentsChapter: IComment[] | null
	countCommentChapter: number
	checkRecommendation: boolean
}
