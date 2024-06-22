import { ICatalog } from "../../../models/ICatalog"
import { Genre } from "../../../models/IGenre"
import { IRecommendation } from "../../../models/IRecommendation"

export interface StateCatalog {
	catalogs: ICatalog[] | null
	count: number
	status: string | null
	type: string | null
	selectedGenres: string | null
	genres: Genre[] | null
	countGenres: number
	sort: string
	page: number
	limit: number
	isLoadingCatalog: boolean
	isVisibleFilter: boolean
	newBooks: ICatalog[] | null
	recommendationBooks: IRecommendation[] | null
}
