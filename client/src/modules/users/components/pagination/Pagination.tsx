import React from "react"
import { useAppSelector } from "../../../../hooks/redux"
import st from "./Pagination.module.scss"

interface IPagination {
	limit: number
	currentPage: number
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ limit, currentPage, setCurrentPage }: IPagination) => {
	const page: Array<number> = []

	const { count } = useAppSelector(state => state.userReducer)

	for (let i = 0; i < Math.ceil(count / limit); i++) {
		page.push(i + 1)
	}

	const renderPagination = () => {
		return page.map(i => {
			if (
				i === currentPage - 1 ||
				i === currentPage - 2 ||
				i === currentPage ||
				i === currentPage + 1 ||
				i === currentPage + 2
			) {
				return (
					<button
						key={i}
						onClick={() => setCurrentPage(i)}
						className={`${st.btn} ${i === currentPage ? st.active : ""}`}
					>
						{i}
					</button>
				)
			}
		})
	}

	return count > 0 ? (
		<div className={st.wrap}>
			{currentPage >= 4 && (
				<>
					<button className={st.btn} onClick={() => setCurrentPage(1)}>
						1
					</button>
					<p className={st.dot}>...</p>
				</>
			)}
			{renderPagination()}
			{currentPage <= page[page.length - 1] - 3 && (
				<>
					<p className={st.dot}>...</p>
					<button
						onClick={() => setCurrentPage(page[page.length - 1])}
						className={st.btn}
					>
						{page[page.length - 1]}
					</button>
				</>
			)}
		</div>
	) : (
		<></>
	)
}

export default Pagination
