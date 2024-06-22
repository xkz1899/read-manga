import { useEffect, useState } from "react"
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr"
import { MdFormatListNumbered, MdOutlineComment } from "react-icons/md"
import { RiImageAddFill } from "react-icons/ri"
import { useNavigate, useParams } from "react-router-dom"

import { CiHeart } from "react-icons/ci"
import Modal from "../../components/modal/Modal"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { RouteName } from "../../routes"
import { reduceNumbers } from "../../utils/reduceNumbers"
import st from "./ChapterMenu.module.scss"
import ChapterPanel from "./components/chapterPanel/ChapterPanel"
import Comments from "./components/comments/Comments"
import { addChapterLike, getChapters } from "./service/chapterMenuService"

const ChapterMenu = () => {
	const { id, chapterId, page } = useParams()
	const router = useNavigate()

	const { countChapterPage, chapters } = useAppSelector(
		state => state.bookReducer
	)
	const { currentUser } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	const [visibleChapter, setVisibleChapter] = useState(false)
	const [visibleComment, setVisibleComment] = useState(false)
	const [arrayPages, setArrayPages] = useState<Array<number>>([])

	useEffect(() => {
		dispatch(getChapters(Number(id)))
	}, [])

	useEffect(() => {
		setArrayPages(Array(countChapterPage).fill(0))
	}, [countChapterPage])

	const changePage = (numPage: string) => {
		if (countChapterPage > Number(numPage)) {
			router(RouteName.CHAPTER + "/" + id + "/" + chapterId + "/" + numPage)
			window.scrollTo(0, 0)
		}
	}
	const nextPage = () => {
		if (countChapterPage - 1 > Number(page)) {
			router(
				RouteName.CHAPTER +
					"/" +
					id +
					"/" +
					chapterId +
					"/" +
					(Number(page) + 1)
			)
		} else {
			if (
				chapters &&
				chapters[chapters?.findIndex(f => f.id === Number(chapterId)) - 1]
			) {
				router(
					RouteName.CHAPTER +
						"/" +
						id +
						"/" +
						chapters[
							chapters?.findIndex(f => f.id === Number(chapterId)) - 1
						].id.toString() +
						"/" +
						"0"
				)
			}
		}
		window.scrollTo(0, 0)
	}
	const prevPage = async () => {
		if (Number(page) > 0) {
			router(
				RouteName.CHAPTER +
					"/" +
					id +
					"/" +
					chapterId +
					"/" +
					(Number(page) - 1)
			)
		} else {
			if (
				chapters &&
				chapters[chapters?.findIndex(f => f.id === Number(chapterId)) + 1]
			) {
				router(
					RouteName.CHAPTER +
						"/" +
						id +
						"/" +
						chapters[
							chapters?.findIndex(f => f.id === Number(chapterId)) + 1
						].id.toString() +
						"/" +
						"0"
				)
			}
		}

		window.scrollTo(0, 0)
	}
	const redirectCreatePage = () => {
		if (id && chapterId) {
			router(RouteName.CREATE_PAGE + "/" + id + "/" + chapterId)
		}
	}

	return (
		<div className={st.wrap}>
			<div className={st.btns}>
				<button onClick={prevPage} className={st.next}>
					<GrLinkPrevious />
					<span>Предыдущая</span>
				</button>
				{(currentUser?.roles.find(f => f.role === "admin") ||
					currentUser?.roles.find(f => f.role === "writer")) && (
					<button
						title="Редактировать главу"
						onClick={redirectCreatePage}
						className={st.add_page}
					>
						<RiImageAddFill />
					</button>
				)}
				<select onChange={e => changePage(e.target.value)} name="" id="">
					{arrayPages.map((_, i) => (
						<option
							key={i}
							value={i}
							selected={i === Number(page) ? true : false}
						>
							{i + 1}/{countChapterPage}
						</option>
					))}
				</select>
				<button
					title="Главы"
					onClick={() => setVisibleChapter(!visibleChapter)}
					className={st.chapter}
				>
					<MdFormatListNumbered />
				</button>
				<button
					title="Комментарии"
					onClick={() => setVisibleComment(!visibleComment)}
					className={st.comment}
				>
					<MdOutlineComment />
				</button>
				<button
					onClick={() => dispatch(addChapterLike(Number(chapterId)))}
					className={st.like}
				>
					<CiHeart />
					<span>
						{chapters &&
							chapters.length &&
							reduceNumbers(
								chapters[chapters?.findIndex(f => f.id === Number(chapterId))]
									?.likes
							)}
					</span>
				</button>
				<button onClick={nextPage} className={st.next}>
					<span>Следующая</span>
					<GrLinkNext />
				</button>
			</div>
			<Modal visible={visibleChapter} setVisible={setVisibleChapter}>
				<ChapterPanel setVisible={setVisibleChapter} />
			</Modal>
			<Modal visible={visibleComment} setVisible={setVisibleComment}>
				<Comments />
			</Modal>
		</div>
	)
}

export default ChapterMenu
