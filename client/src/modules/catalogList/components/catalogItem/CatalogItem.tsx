import { useNavigate } from "react-router-dom"

import { ICatalog } from "../../../../models/ICatalog"
import { RouteName } from "../../../../routes"
import st from "./CatalogItem.module.scss"

interface ICatalogItem {
	book: ICatalog
}

const CatalogItem = ({ book }: ICatalogItem) => {
	const router = useNavigate()

	return (
		<div className={st.book}>
			<img
				className={st.image}
				src={`${process.env.REACT_APP_API_URL}books/${book.id}/${book.image}`}
				alt=""
				title={book.name}
			/>
			<div className={st.info}>
				<button
					onClick={() => router(RouteName.BOOK + "/" + book.id)}
					title={book.name}
					className={st.name}
				>
					{book.name.slice(0, 30)}
					{book.name.length > 30 && "..."}
				</button>
				<p className={st.type}>{book.type}</p>
			</div>
		</div>
	)
}

export default CatalogItem
