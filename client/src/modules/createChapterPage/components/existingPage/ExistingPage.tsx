import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../../../../hooks/redux"
import {
  deleteChapterPage,
  updateOrderPage,
} from "../../service/createChapterPageService"
import { IChapterPage } from "./../../../../models/IChapterPage"
import st from "./ExistingPage.module.scss"

interface IExistingPage {
	page: IChapterPage
}

const ExistingPage = ({ page }: IExistingPage) => {
	const { bookId, chapterId } = useParams()
	const [order, setOrder] = useState<number>()

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (page) {
			setOrder(page.order)
		}
	}, [])

	return (
		<div className={st.page}>
			<a
				className={st.origin_image}
				href={`${process.env.REACT_APP_API_URL}books/${bookId}/${chapterId}/${page.image}`}
			>
				<img
					src={`${process.env.REACT_APP_API_URL}books/${bookId}/${chapterId}/${page.image}`}
					alt=""
				/>
			</a>

			<input
				type="number"
				className={st.exist_order}
				value={order}
				onChange={e => setOrder(Number(e.target.value))}
			/>
			<button
				title="Изменить порядок"
				onClick={() => dispatch(updateOrderPage(page.id, Number(order)))}
				className={st.edit}
			>
				Изменить
			</button>
			<button
				title="Удалить страницу"
				onClick={() => dispatch(deleteChapterPage(page.id))}
				className={st.delete}
			>
				Удалить
			</button>
		</div>
	)
}

export default ExistingPage
