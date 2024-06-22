import { useEffect, useRef, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import st from "./Search.module.scss"
import { useAppSelector } from "../../../../hooks/redux"
import { useDelay } from "../../../../hooks/delay"

interface ISearch {
	setPage: React.Dispatch<React.SetStateAction<number>>
	setSearch: React.Dispatch<React.SetStateAction<string>>
}

const Search = ({ setSearch, setPage }: ISearch) => {
	const [searchValue, setSearchValue] = useState(``)

	const value = useDelay(searchValue)

	useEffect(() => {
		setSearch(value)
		setPage(1)
	}, [value])

	return (
		<input
			className={st.search}
			placeholder="Поиск пользователей..."
			type="text"
			value={searchValue}
			onChange={e => setSearchValue(e.target.value)}
		/>
	)
}

export default Search
