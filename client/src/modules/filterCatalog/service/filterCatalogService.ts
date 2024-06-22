import { queries } from "@testing-library/react"
import { $host } from "../../../http"
import { AppDispatch } from "../../../store"
import {
	setCatalogs,
	setCount,
	setCountGenres,
	setGenres,
	setLoadingCatalog,
} from "../../../store/reducers/catalog/catalogReducer"
import { IResponseGenre } from "../models/IResponseGenre"
import { IResponseCatalog } from "../../../models/ICatalog"

export const getGenre = () => async (dispatch: AppDispatch) => {
	try {
		const response = await $host.get<IResponseGenre>("book/genre?")
		dispatch(setGenres(response.data.rows))
		dispatch(setCountGenres(response.data.count))
	} catch (err) {}
}

export const getCatalog =
	(
		status: string | null,
		type: string | null,
		genres: Array<number> | null,
		limit: number,
		page: number,
		sort: string
	) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(setLoadingCatalog(true))
			let genre = null
			if (genres) {
				genre = JSON.stringify(genres)
			}
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
