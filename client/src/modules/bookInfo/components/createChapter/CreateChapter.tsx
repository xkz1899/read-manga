import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { createChapter } from "../../service/bookInfoService"
import st from "./CreateChapter.module.scss"
const CreateChapter = () => {
	const { id } = useParams()

	const { currentBook } = useAppSelector(state => state.bookReducer)
	const dispatch = useAppDispatch()

	const [name, setName] = useState("")
	const [order, setOrder] = useState("")

	useEffect(() => {
		let orderTemp: string
		if (currentBook?.chapters.length) {
			orderTemp = (
				currentBook.chapters[0].order + 1
			).toString()
			setOrder(orderTemp)
		} else {
			setOrder("0")
		}
	}, [currentBook])

	const createChapterHandler = () => {
		if (name.length >= 1 && order.length >= 1 && id) {
			dispatch(createChapter(name, order, id))
			setName("")
		}
	}

	return (
		<div className={st.wrap}>
			<input
				type="text"
				className={st.create_name_chapter}
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder="Название главы..."
			/>
			<input
				type="number"
				className={st.create_order_chapter}
				value={order}
				onChange={e => setOrder(e.target.value)}
				placeholder="Порядок..."
			/>
			<button onClick={createChapterHandler} className={st.add_chapter}>
				Добавить главу
			</button>
		</div>
	)
}

export default CreateChapter
