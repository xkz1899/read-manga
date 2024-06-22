import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../../../../hooks/redux"
import { RouteName } from "../../../../routes"
import st from "./ChapterPanel.module.scss"
import React from "react"

interface IChapterPanel {
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ChapterPanel = ({ setVisible }: IChapterPanel) => {
	const router = useNavigate()
	const { id, chapterId } = useParams()

	const { countChapter, chapters } = useAppSelector(state => state.bookReducer)

	const selectChapter = (chapterId: number) => {
		router(RouteName.CHAPTER + "/" + id + "/" + chapterId + "/" + "0")
		setVisible(false)
	}

	return (
		<div className={st.wrap}>
			<h2 className={st.title}>Список глав ({countChapter})</h2>
			<div className={st.chapters}>
				{chapters?.map(chapter => (
					<button
						onClick={() => selectChapter(chapter.id)}
						key={chapter.id}
						className={`${st.chapter} ${
							Number(chapterId) === chapter.id && st.select_chapter
						}`}
					>
						<p className={st.chapter_name}>{chapter.name}</p>
						<div className={st.chapter_info}>
							<p>{chapter.createdAt.slice(0, 10)}</p>
						</div>
					</button>
				))}
			</div>
		</div>
	)
}

export default ChapterPanel
