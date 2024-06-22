import { IoCloseSharp } from "react-icons/io5"
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { setVisibleError } from "../../../../store/reducers/auth/authReducer"
import st from "./Error.module.scss"

const Error = () => {
	const { isVisibleError, error } = useAppSelector(state => state.authReducer)
	const dispatch = useAppDispatch()

	return (
		<>
			{isVisibleError && (
				<div className={st.error}>
					<p>{error}</p>
					<button
						className={st.close}
						onClick={() => dispatch(setVisibleError(false))}
					>
						<IoCloseSharp />
					</button>
				</div>
			)}
		</>
	)
}

export default Error
