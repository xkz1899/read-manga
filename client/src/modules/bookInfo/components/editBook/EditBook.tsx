import React, { useEffect, useState } from "react"
import st from "./EditBook.module.scss"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { editBook } from "../../service/bookInfoService"
import { useParams } from "react-router-dom"

const EditBook = () => {
	const { id } = useParams()
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [status, setStatus] = useState("")
	const [type, setType] = useState("")
	const [date, setDate] = useState("")

	const { currentBook } = useAppSelector(state => state.bookReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (currentBook) {
			setName(currentBook.name)
			setDescription(currentBook.description)
			setStatus(currentBook.status)
			setType(currentBook.type)
			setDate(currentBook.release_date)
		}
	}, [currentBook])

	const editBookHandler = () => {
		if (
			id &&
			name.length > 1 &&
			description.length &&
			status.length &&
			type.length &&
			Number.isInteger(Number(date))
		) {
			dispatch(
				editBook(Number(id), name, description, type, status, Number(date))
			)
		}
	}

	return (
		<div className={st.wrap}>
			<input
				placeholder="Название..."
				className={st.name}
				type="text"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			<input
				className={st.date}
				type="number"
				value={date}
				onChange={e => setDate(e.target.value)}
			/>
			<textarea
				placeholder="Описание..."
				className={st.description}
				value={description}
				onChange={e => setDescription(e.target.value)}
			></textarea>
			<select
				value={type}
				onChange={e => setType(e.target.value)}
				className={st.type}
			>
				<option value="Манга">Манга</option>
				<option value="Манхва">Манхва</option>
				<option value="Маньхуа">Маньхуа</option>
			</select>
			<select
				value={status}
				onChange={e => setStatus(e.target.value)}
				className={st.status}
			>
				<option value="Завершен">Завершен</option>
				<option value="Продолжается">Продолжается</option>
				<option value="Заморожен">Заморожен</option>
				<option value="Заброшен">Заброшен</option>
			</select>
			<button onClick={editBookHandler} className={st.save}>
				Сохранить
			</button>
		</div>
	)
}

export default EditBook
