import { $authHost } from "../../../http"
import { AppDispatch } from "../../../store"
import { setCount, setUsers } from "../../../store/reducers/user/userReducer"
import { IResponseUsers } from "../models/IResponseUsers"

export const getUsers =
	(page: number, limit: number) => async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.get<IResponseUsers>("user/", {
				params: { page, limit },
			})
			dispatch(setUsers(response.data.rows))
			dispatch(setCount(response.data.count))
		} catch (err) {}
	}

export const appointRole = async (userId: number, roleId: number) => {
	try {
		await $authHost.post("role/appoint", { userId, roleId })
	} catch (err) {
	} finally {
		window.location.reload()
	}
}
export const deleteRole = async (id: number) => {
	try {
		await $authHost.delete(`role/${id}`)
	} catch (err) {
	} finally {
		window.location.reload()
	}
}

export const searchUsers =
	(search: string, page: number, limit: number) =>
	async (dispatch: AppDispatch) => {
		try {
			const response = await $authHost.get<IResponseUsers>(`user/search`, {
				params: { search, page, limit },
			})
			dispatch(setUsers(response.data.rows))
			dispatch(setCount(response.data.count))
		} catch (err) {}
	}
