import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { RouteName } from "../../routes"
import st from "./RecommendationBook.module.scss"
import { getRecommendationBook } from "./service/newBooksService"

const RecommendationBook = () => {
	const router = useNavigate()

	const { recommendationBooks } = useAppSelector(state => state.catalogReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getRecommendationBook())
	}, [])

	return (
		<>
			{recommendationBooks && (
				<div className={st.wrap}>
					<h2 className={st.title}>Рекомендуемое</h2>
					<div className={st.news}>
						{recommendationBooks?.map(recommendation => (
							<div key={recommendation.book.id} className={st.book}>
								<img
									title={recommendation.book.name}
									src={`${process.env.REACT_APP_API_URL}books/${recommendation.book.id}/${recommendation.book.image}`}
									alt=""
								/>
								<button
									onClick={() =>
										router(RouteName.BOOK + "/" + recommendation.book.id)
									}
									className={st.name}
									title={recommendation.book.name}
								>
									{recommendation.book.name.slice(0, 30)}{" "}
									{recommendation.book.name.length > 30 ? "..." : ""}
								</button>
								<p className={st.type}>{recommendation.book.type}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	)
}

export default RecommendationBook
