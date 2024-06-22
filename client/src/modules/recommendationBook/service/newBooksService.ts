import { $host } from "../../../http"
import { IRecommendation } from "../../../models/IRecommendation"
import { AppDispatch } from "../../../store"
import { setRecommendationBooks } from "../../../store/reducers/catalog/catalogReducer"

export const getRecommendationBook = () => async (dispatch: AppDispatch) => {
	try {
		const response = await $host.get<IRecommendation[]>(`book/recommendation`)
		dispatch(setRecommendationBooks(response.data))
	} catch (err) {}
}
