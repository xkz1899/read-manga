import { useEffect, useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import { SlLogout } from "react-icons/sl"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { RouteName } from "../../routes"
import st from "./Header.module.scss"
import Logo from "./comments/logo/Logo"
import { logout } from "./service/headerService"

const Header = () => {
	const router = useNavigate()

	const [isVisibleMenu, setVisibleMenu] = useState(false)

	const dispatch = useAppDispatch()
	const { currentUser, isAuth } = useAppSelector(state => state.authReducer)

	useEffect(() => {
		setVisibleMenu(false)
	}, [window.location.pathname])

	return (
		<header className={st.header}>
			<button
				className={st.burger}
				onClick={() => setVisibleMenu(!isVisibleMenu)}
			>
				<RxHamburgerMenu />
			</button>
			<div className={st.left}>
				<Logo />
				<div className={`${st.menu} ${isVisibleMenu ? st.menu_active : ""}`}>
					<button
						className={`${st.main} ${
							window.location.pathname === RouteName.MAIN ? st.active : ""
						}`}
						onClick={() => router(RouteName.MAIN)}
					>
						Главная
					</button>
					<button
						className={`${st.catalog} ${
							window.location.pathname === RouteName.CATALOG ? st.active : ""
						}`}
						onClick={() => router(RouteName.CATALOG)}
					>
						Каталог
					</button>
					{isAuth &&
						(currentUser?.roles.find(f => f.role === "admin") ||
							currentUser?.roles.find(f => f.role === "writer")) && (
							<button
								className={`${st.create} ${
									window.location.pathname === RouteName.CREATE ? st.active : ""
								}`}
								onClick={() => router(RouteName.CREATE)}
							>
								Создать
							</button>
						)}
					{isAuth && currentUser?.roles.find(f => f.role === "admin") && (
						<button
							className={`${st.user} ${
								window.location.pathname === RouteName.USER_ROLE
									? st.active
									: ""
							}`}
							onClick={() => router(RouteName.USER_ROLE)}
						>
							Пользователи
						</button>
					)}
				</div>
			</div>
			<div className={st.right}>
				{isAuth ? (
					<button onClick={() => dispatch(logout())} className={st.logout}>
						<SlLogout />
					</button>
				) : (
					<button
						onClick={() => router(RouteName.AUTHORIZATION)}
						className={st.auth}
					>
						Вход/Регистрация
					</button>
				)}
			</div>
		</header>
	)
}

export default Header
