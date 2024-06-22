import { $host } from "../../../http"
import { AppDispatch } from "../../../store"
import {
	setCatalogs,
	setCount,
	setLoadingCatalog,
} from "../../../store/reducers/catalog/catalogReducer"
import { IResponseCatalog } from "./../../../models/ICatalog"

export const getCatalog =
	(
		status: string | null,
		type: string | null,
		genre: string | null,
		limit: number,
		page: number,
		sort: string
	) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(setLoadingCatalog(true))
			const response = await $host.get<IResponseCatalog>(`book`, {
				params: {
					status,
					type,
					genre,
					limit,
					page,
					sort,
				},
			})
			dispatch(setCatalogs(response.data.rows))
			dispatch(setCount(response.data.count))
		} catch (err) {
		} finally {
			dispatch(setLoadingCatalog(false))
		}
	}
