import { MdClear } from "react-icons/md"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { IComment } from "../../../../models/IComment"
import { removeCommentChapter } from "../../service/chapterMenuService"
import st from "./Comment.module.scss"

interface ICommentComponent {
	comment: IComment
}

const Comment = ({ comment }: ICommentComponent) => {
	const { currentUser } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	return (
		<div className={st.wrap}>
			<div>
				<div className={st.header}>
					<div>
						<p className={st.login}>{comment.user.login}</p>
						<p className={st.create_date}>
							{comment.createdAt.slice(0, 16).replace(/T/, " ")}
						</p>
					</div>
					{(currentUser?.roles.find(f => f.role === "admin") ||
						currentUser?.roles.find(f => f.role === "writer") ||
						currentUser?.id === comment.userId) && (
						<button
							onClick={() => dispatch(removeCommentChapter(comment.id))}
							className={st.remove}
						>
							<MdClear />
						</button>
					)}
				</div>
			</div>
			<p className={st.message}>{comment.text}</p>
		</div>
	)
}

export default Comment
