import { useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { IoClose } from "react-icons/io5"

import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { Genre } from "../../models/IGenre"
import {
	setSelectedGenres,
	setStatus,
	setType,
	setVisibleFilter,
} from "../../store/reducers/catalog/catalogReducer"
import st from "./FilterCatalog.module.scss"
import { getGenre } from "./service/filterCatalogService"
import { checkExistGenre } from "./utils/checkExistGenre"

const FilterCatalog = () => {
	const dispatch = useAppDispatch()
	const { genres, isVisibleFilter } = useAppSelector(
		state => state.catalogReducer
	)

	const [genresArr, setGenresArr] = useState<Genre[]>([])
	const [statusValue, setStatusValue] = useState("")
	const [typeValue, setTypeValue] = useState("")

	useEffect(() => {
		dispatch(getGenre())
	}, [])

	useEffect(() => {
		dispatch(setType(typeValue))
		dispatch(setStatus(statusValue))
		const arr: Array<number> = []
		genresArr.forEach(i => arr.push(i.id))
		dispatch(setSelectedGenres(genresArr.length ? JSON.stringify(arr) : null))
	}, [typeValue, statusValue, genresArr])

	const addGenre = (genre: Genre) => {
		if (checkExistGenre(genresArr, genre)) {
			setGenresArr([...genresArr, genre])
		}
	}
	const removeGenre = (name: string) => {
		setGenresArr(genresArr.filter(f => f.name !== name))
	}

	return (
		<div className={`${st.wrap} ${isVisibleFilter ? st.active : ""}`}>
			<div className={st.filter_header}>
				<h2 className={st.title}>Фильтры:</h2>
				<button
					onClick={() => dispatch(setVisibleFilter(false))}
					className={st.filter_close}
				>
					<IoClose />
				</button>
			</div>
			<div className={st.select}>
				{genresArr.length ? (
					<div className={st.genres_preview}>
						{genresArr.map(genre => (
							<div className={st.genre} key={genre.id}>
								<p>{genre.name}</p>
								<button
									onClick={() => removeGenre(genre.name)}
									className={st.close}
								>
									<IoMdClose />
								</button>
							</div>
						))}
					</div>
				) : (
					<></>
				)}

				<select
					onChange={e => addGenre(JSON.parse(e.target.value))}
					className={st.select_genres}
				>
					<option defaultChecked>Жанры</option>
					{genres?.map(
						genre =>
							checkExistGenre(genresArr, genre) && (
								<option key={genre.id} value={JSON.stringify(genre)}>
									{genre.name}
								</option>
							)
					)}
				</select>
				<select
					className={st.select_status}
					name="status"
					onChange={e => setStatusValue(e.target.value)}
				>
					<option value="" defaultChecked>
						Статус
					</option>
					<option value="Завершен">Завершен</option>
					<option value="Продолжается">Продолжается</option>
					<option value="Заморожен">Заморожен</option>
					<option value="Заброшен">Заброшен</option>
				</select>
				<select
					className={st.select_type}
					onChange={e => setTypeValue(e.target.value)}
					name="type"
				>
					<option value="" defaultChecked>
						Тип
					</option>
					<option value="Манга">Манга</option>
					<option value="Манхва">Манхва</option>
					<option value="Маньхуа">Маньхуа</option>
				</select>
			</div>
		</div>
	)
}

export default FilterCatalog
