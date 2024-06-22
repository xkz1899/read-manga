import { useEffect, useState } from "react"
import { HiClipboardDocumentList } from "react-icons/hi2"
import { IoSend } from "react-icons/io5"
import { useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import {
	addCommentChapter,
	getCommentChapter,
} from "../../service/chapterMenuService"
import Comment from "../comment/Comment"
import st from "./Comment.module.scss"

const Comments = () => {
	const { chapterId } = useParams()

	const step = 10
	const [limit, setLimit] = useState(step)
	const [message, setMessage] = useState("")

	const { countCommentChapter, commentsChapter } = useAppSelector(
		state => state.bookReducer
	)
	const { isAuth } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getCommentChapter(Number(chapterId), limit))
	}, [chapterId, limit])

	const createComment = () => {
		if (chapterId && message.length) {
			dispatch(addCommentChapter(Number(chapterId), message))
			setMessage("")
		}
	}

	return (
		<div className={st.wrap}>
			<h3 className={st.title}>Комментарии ({countCommentChapter})</h3>
			{isAuth ? (
				<div className={st.create_comment}>
					<input
						placeholder="Сообщение..."
						type="text"
						value={message}
						onChange={e => setMessage(e.target.value)}
					/>
					<button onClick={createComment} className={st.send}>
						<IoSend />
					</button>
				</div>
			) : (
				<p className={st.not_auth}>Авторизуйтесь что бы оставить комментарий</p>
			)}
			<div className={st.comments}>
				{countCommentChapter > 0 ? (
					commentsChapter?.map(comment => (
						<Comment key={comment.id} comment={comment} />
					))
				) : (
					<div className={st.empty}>
						<HiClipboardDocumentList />
						<p>Комментариев нет</p>
					</div>
				)}
				{limit < countCommentChapter && (
					<button
						onClick={() => setLimit(limit + step)}
						className={st.show_more}
					>
						Показать ещё
					</button>
				)}
			</div>
		</div>
	)
}

export default Comments
