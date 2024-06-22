import { $authHost } from "../../../http"
import { AppDispatch } from "../../../store"
import {
  setAuth,
  setCurrentUser,
  setError,
} from "../../../store/reducers/auth/authReducer"

export const logout = () => async (dispatch: AppDispatch) => {
	try {
		await $authHost.get("/auth/logout")
		dispatch(setCurrentUser(null))
		localStorage.removeItem("accessToken")
		dispatch(setAuth(false))
	} catch (err: any) {
		dispatch(setError(err.response.data.message))
	}
}
