import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import st from "./NewBooks.module.scss"
import { getNewBooks } from "./service/newBooksService"
import { RouteName } from "../../routes"

const NewBooks = () => {
	const router = useNavigate()

	const { newBooks } = useAppSelector(state => state.catalogReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getNewBooks(7))
	}, [])

	
	return (
		<div className={st.wrap}>
			<h2 className={st.title}>Новинки</h2>
			<div className={st.news}>
				{newBooks?.map(book => (
					<div key={book.id} className={st.book}>
						<img
							title={book.name}
							src={`${process.env.REACT_APP_API_URL}books/${book.id}/${book.image}`}
							alt=""
						/>
						<button
							onClick={() => router(RouteName.BOOK + "/" + book.id)}
							className={st.name}
							title={book.name}
						>
							{book.name.slice(0, 30)} {book.name.length > 30 ? "..." : ""}
						</button>
						<p className={st.type}>{book.type}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default NewBooks
