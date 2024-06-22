import React, { useState } from "react"
import { CiHeart } from "react-icons/ci"
import { IoMdClose } from "react-icons/io"
import { useNavigate } from "react-router-dom"

import { MdEdit } from "react-icons/md"
import Modal from "../../../../components/modal/Modal"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { IChapter } from "../../../../models/IChapter"
import { RouteName } from "../../../../routes"
import { reduceNumbers } from "../../../../utils/reduceNumbers"
import { addChapterLike, destroyChapter } from "../../service/bookInfoService"
import CreateChapter from "../createChapter/CreateChapter"
import EditChapter from "../editChapter/EditChapter"
import st from "./Chapter.module.scss"

const Chapters = () => {
	const router = useNavigate()

	const [editVisible, setEditVisible] = useState(false)
	const [currentChapter, setCurrentChapter] = useState<IChapter | null>(null)

	const { currentBook } = useAppSelector(state => state.bookReducer)
	const { currentUser } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	const likeChapter = (
		e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
		chapterId: number
	) => {
		e.stopPropagation()
		dispatch(addChapterLike(chapterId))
	}

	const removeChapterHandler = (
		e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
		id: number
	) => {
		e.stopPropagation()
		dispatch(destroyChapter(id))
	}

	const editVisibleHandler = async (
		e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
		chapter: IChapter
	) => {
		e.stopPropagation()
		setEditVisible(true)
		setCurrentChapter(chapter)
	}

	return (
		<div className={st.chapters}>
			{(currentUser?.roles.find(f => f.role === "admin") ||
				currentUser?.roles.find(f => f.role === "writer")) && <CreateChapter />}
			{currentBook?.chapters.map(chapter => (
				<button
					onClick={() =>
						router(
							RouteName.CHAPTER +
								"/" +
								currentBook.id +
								"/" +
								chapter.id +
								"/" +
								"0"
						)
					}
					key={chapter.id}
					className={st.chapter}
				>
					<p className={st.chapter_name}>{chapter.name}</p>
					<div className={st.chapter_info}>
						<p>{chapter.order}</p>
						<p>{chapter.createdAt.slice(0, 10)}</p>
						<p onClick={e => likeChapter(e, chapter.id)} className={st.like}>
							<CiHeart />
							{reduceNumbers(chapter.likes)}
						</p>
						{(currentUser?.roles.find(f => f.role === "admin") ||
							currentUser?.roles.find(f => f.role === "writer")) && (
							<p
								title="Удалить главу"
								className={st.remove_chapter}
								onClick={e => removeChapterHandler(e, chapter.id)}
							>
								<IoMdClose />
							</p>
						)}
						{(currentUser?.roles.find(f => f.role === "admin") ||
							currentUser?.roles.find(f => f.role === "writer")) && (
							<p
								onClick={e => editVisibleHandler(e, chapter)}
								className={st.edit}
								title="Редактировать главу"
							>
								<MdEdit />
							</p>
						)}
					</div>
				</button>
			))}
			<Modal visible={editVisible} setVisible={setEditVisible}>
				{currentChapter && <EditChapter chapter={currentChapter} />}
			</Modal>
		</div>
	)
}

export default Chapters
