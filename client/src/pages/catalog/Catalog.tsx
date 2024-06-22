import CatalogPagination from "../../components/catalogPagination/CatalogPagination"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { CatalogList } from "../../modules/catalogList"
import { FilterCatalog } from "../../modules/filterCatalog"
import { setVisibleFilter } from "../../store/reducers/catalog/catalogReducer"
import st from "./Catalog.module.scss"

const Catalog = () => {
	const { count, limit, isVisibleFilter } = useAppSelector(
		state => state.catalogReducer
	)
	const dispatch = useAppDispatch()

	return (
		<div className={st.wrap}>
			<button
				onClick={() => dispatch(setVisibleFilter(!isVisibleFilter))}
				className={st.filter}
			>
				Фильтры
			</button>
			<div className={st.catalog}>
				<CatalogList />
				<FilterCatalog />
				{count > limit && <CatalogPagination />}
			</div>
		</div>
	)
}

export default Catalog
