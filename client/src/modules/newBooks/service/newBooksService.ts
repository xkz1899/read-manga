import { $host } from "../../../http"
import { IResponseCatalog } from "../../../models/ICatalog"
import { AppDispatch } from "../../../store"
import { setNewBooks } from "../../../store/reducers/catalog/catalogReducer"

export const getNewBooks = (limit: number) => async (dispatch: AppDispatch) => {
	try {
		const response = await $host.get<IResponseCatalog>("book", {
			params: { limit },
		})
		dispatch(setNewBooks(response.data.rows))
	} catch (err) {}
}
