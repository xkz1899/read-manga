import React from "react"
import { NewBooks } from "../../modules/newBooks"
import { RecommendationBook } from "../../modules/recommendationBook"
import st from "./Main.module.scss"

const Main = () => {
	return (
		<div className={st.wrap}>
			<NewBooks />
			<RecommendationBook />
		</div>
	)
}

export default Main
