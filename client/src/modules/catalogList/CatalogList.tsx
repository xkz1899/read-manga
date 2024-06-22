import { useEffect } from "react"
import { FaImages } from "react-icons/fa"

import Loader from "../../components/loader/Loader"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import st from "./CatalogList.module.scss"
import CatalogItem from "./components/catalogItem/CatalogItem"
import { getCatalog } from "./service/catalogListService"

const CatalogList = () => {
	const dispatch = useAppDispatch()

	const {
		catalogs,
		count,
		selectedGenres,
		sort,
		status,
		type,
		isLoadingCatalog,
		limit,
		page,
	} = useAppSelector(state => state.catalogReducer)

	useEffect(() => {
		dispatch(
			getCatalog(
				status?.length ? status : null,
				type?.length ? type : null,
				selectedGenres?.length ? selectedGenres : null,
				limit,
				page,
				sort
			)
		)
	}, [page, limit, sort, status, type, selectedGenres])

	return (
		<div
			className={`${st.wrap} ${isLoadingCatalog ? st.hide : ""} ${
				!catalogs?.length ? st.active : ""
			}`}
		>
			{!isLoadingCatalog ? (
				count > 0 ? (
					catalogs?.map(book => <CatalogItem key={book.id} book={book} />)
				) : (
					<div className={st.empty}>
						<FaImages />
						<p>Нечего не найдено</p>
					</div>
				)
			) : (
				<div className={st.loading}>
					<Loader />
				</div>
			)}
		</div>
	)
}

export default CatalogList
