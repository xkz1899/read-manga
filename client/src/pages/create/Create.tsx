import { useAppSelector } from "../../hooks/redux"
import { CreateBook } from "../../modules/createBook"
import st from "./Create.module.scss"

const Create = () => {
	const { currentUser } = useAppSelector(state => state.authReducer)
	return currentUser?.roles.find(f => f.role === "admin") ||
		currentUser?.roles.find(f => f.role === "writer") ? (
		<CreateBook />
	) : (
		<div className={st.access_error}>
			<p>Уровень доступа не соответствует.</p>
		</div>
	)
}

export default Create
