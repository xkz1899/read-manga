import { useEffect, useState } from "react"
import st from "./EditChapter.module.scss"
import { IChapter } from "../../../../models/IChapter"
import { useAppDispatch } from "../../../../hooks/redux"
import { editChapter } from "../../service/bookInfoService"

interface IEditChapter {
	chapter: IChapter
}

const EditChapter = ({ chapter }: IEditChapter) => {
	const [name, setName] = useState("")
	const [order, setOrder] = useState(1)

	const dispatch = useAppDispatch()

	useEffect(() => {
		setName(chapter.name)
		setOrder(chapter.order)
	}, [chapter])

	return (
		<div className={st.wrap}>
			<p>Название:</p>
			<input type="text" value={name} onChange={e => setName(e.target.value)} />
			<p>Порядок: </p>
			<input
				type="number"
				value={order}
				className={st.order}
				onChange={e => setOrder(Number(e.target.value))}
			/>
			<button
				onClick={() => dispatch(editChapter(chapter.id, name, order))}
				className={st.btn_save}
			>
				Сохранить
			</button>
		</div>
	)
}

export default EditChapter
