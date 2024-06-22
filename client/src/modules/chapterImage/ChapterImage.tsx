import { useEffect } from "react"
import { FaImages } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { RouteName } from "../../routes"
import st from "./ChapterImage.module.scss"
import { getBook, getChapterPage } from "./service/chapterImageService"

const ChapterImage = () => {
	const { id, chapterId, page } = useParams()
	const router = useNavigate()

	const { currentUser } = useAppSelector(state => state.authReducer)
	const { chapterPages, currentBook, chapters } = useAppSelector(
		state => state.bookReducer
	)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getChapterPage(Number(chapterId)))
		dispatch(getBook(Number(id)))
	}, [chapterId])

	const redirectCreatePage = () => {
		if (id && chapterId) {
			router(RouteName.CREATE_PAGE + "/" + id + "/" + chapterId)
		}
	}
	const redirectBookPage = () => {
		if (id && chapterId) {
			router(RouteName.BOOK + "/" + id)
		}
	}

	return (
		<>
			{chapterPages?.length ? (
				<div className={st.wrap}>
					<button className={st.book_name}>
						<span className={st.book} onClick={redirectBookPage}>
							{currentBook?.name.slice(0, 50)}
							{currentBook && currentBook?.name.length > 50 && "..."}{" "}
						</span>
						{chapters && chapters.length > 0 && (
							<span className={st.chapter}>
								{
									chapters[chapters?.findIndex(f => f.id === Number(chapterId))]
										?.name
								}
							</span>
						)}
					</button>
					{chapterPages && (
						<img
							className={st.image}
							src={`${process.env.REACT_APP_API_URL}books/${id}/${chapterId}/${
								chapterPages[Number(page)].image
							}`}
							alt=""
						/>
					)}
				</div>
			) : currentUser?.roles.find(f => f.role === "admin") ||
			  currentUser?.roles.find(f => f.role === "writer") ? (
				<button onClick={redirectCreatePage} className={st.add_page}>
					Добавить страницу
				</button>
			) : (
				<div className={st.not_found}>
					<FaImages />
					<p>Страниц пока нет</p>
				</div>
			)}
		</>
	)
}

export default ChapterImage
