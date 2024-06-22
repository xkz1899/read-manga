import { useEffect, useState } from "react"
import { IoMdAddCircleOutline, IoMdClose } from "react-icons/io"

import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import st from "./Users.module.scss"
import Pagination from "./components/pagination/Pagination"
import {
	appointRole,
	deleteRole,
	getUsers,
	searchUsers,
} from "./service/usersService"
import Search from "./components/search/Search"

const Users = () => {
	const [search, setSearch] = useState("")
	const [page, setPage] = useState(1)
	const limit = 9

	const { currentUser } = useAppSelector(state => state.authReducer)
	const { users, count } = useAppSelector(state => state.userReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (search.length) {
			dispatch(searchUsers(search, page, limit))
		} else {
			dispatch(getUsers(page, limit))
		}
	}, [page, search])

	return (
		<div className={st.wrap}>
			<div className={st.users}>
				<Search setPage={setPage} setSearch={setSearch} />
				<div className={st.column_name}>
					<p>Логин</p>
					<p>E-Mail</p>
					<p>Роли</p>
				</div>
				{users?.map(user => (
					<div key={user.id} className={st.user}>
						<p className={st.login}>{user.login}</p>
						<p className={st.login}>{user.email}</p>
						<div className={st.roles}>
							{user.roles.map(role => (
								<div className={st.role} key={role.id}>
									<p className={st.role_name}>{role.role}</p>
									{currentUser?.roles.find(f => f.role === "admin") &&
										role.role !== "user" &&
										role.role !== "admin" && (
											<button
												onClick={() => deleteRole(role.user_role.id)}
												className={st.remove}
											>
												<IoMdClose />
											</button>
										)}
								</div>
							))}
							{currentUser?.roles.find(f => f.role === "admin") && (
								<button
									title="Добавить роль писателя"
									onClick={() => appointRole(user.id, 3)}
									className={st.add}
								>
									<IoMdAddCircleOutline />
								</button>
							)}
						</div>
					</div>
				))}
			</div>
			{count > limit && (
				<Pagination currentPage={page} setCurrentPage={setPage} limit={limit} />
			)}
		</div>
	)
}

export default Users
