import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { StateCatalog } from "./type"
import { ICatalog } from "../../../models/ICatalog"
import { Genre } from "../../../models/IGenre"
import { IRecommendation } from "../../../models/IRecommendation"

const initialState: StateCatalog = {
	catalogs: null,
	count: 0,
	countGenres: 0,
	selectedGenres: null,
	genres: null,
	status: null,
	type: null,
	sort: "createdAt:DESC",
	page: 1,
	limit: 20,
	isLoadingCatalog: false,
	isVisibleFilter: false,
	newBooks: null,
	recommendationBooks: null,
}

const catalogReducer = createSlice({
	name: "catalog",
	initialState,
	reducers: {
		setCatalogs(state, action: PayloadAction<ICatalog[] | null>) {
			state.catalogs = action.payload
		},
		setCount(state, action: PayloadAction<number>) {
			state.count = action.payload
		},
		setStatus(state, action: PayloadAction<string | null>) {
			state.status = action.payload
		},
		setType(state, action: PayloadAction<string | null>) {
			state.type = action.payload
		},
		setSort(state, action: PayloadAction<string>) {
			state.sort = action.payload
		},
		setSelectedGenres(state, action: PayloadAction<string | null>) {
			state.selectedGenres = action.payload
		},
		setLoadingCatalog(state, action: PayloadAction<boolean>) {
			state.isLoadingCatalog = action.payload
		},
		setGenres(state, action: PayloadAction<Genre[] | null>) {
			state.genres = action.payload
		},
		setCountGenres(state, action: PayloadAction<number>) {
			state.countGenres = action.payload
		},
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload
		},
		setLimit(state, action: PayloadAction<number>) {
			state.limit = action.payload
		},
		setVisibleFilter(state, action: PayloadAction<boolean>) {
			state.isVisibleFilter = action.payload
		},
		setNewBooks(state, action: PayloadAction<ICatalog[] | null>) {
			state.newBooks = action.payload
		},
		setRecommendationBooks(
			state,
			action: PayloadAction<IRecommendation[] | null>
		) {
			state.recommendationBooks = action.payload
		},
		addRecommendation(state, action: PayloadAction<IRecommendation>) {
			state.recommendationBooks?.unshift(action.payload)
		},
		deleteRecommendation(state, action: PayloadAction<number>) {
			state.recommendationBooks?.filter(f => f.id !== action.payload)
		},
	},
})

export default catalogReducer.reducer
export const {
	setCatalogs,
	setCount,
	setSort,
	setStatus,
	setType,
	setLoadingCatalog,
	setGenres,
	setCountGenres,
	setSelectedGenres,
	setLimit,
	setPage,
	setVisibleFilter,
	setNewBooks,
	setRecommendationBooks,
	addRecommendation,
	deleteRecommendation,
} = catalogReducer.actions
