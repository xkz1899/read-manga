import { authRoute, publicRoute } from "../routes"
import { Routes, Route } from "react-router-dom"
import { useAppSelector } from "../hooks/redux"
import Ban from "./../pages/ban/Ban"
import Auth from "../pages/auth/Auth"

const AppRouter = () => {
	const { isAuth, currentUser } = useAppSelector(state => state.authReducer)

	return (
		<>
			{isAuth ? (
				!currentUser?.ban ? (
					<Routes>
						{authRoute.map(({ path, Element }) => (
							<Route key={path} path={path} element={<Element />} />
						))}
					</Routes>
				) : (
					<Routes>
						<Route path="*" element={<Ban />} />
					</Routes>
				)
			) : (
				<Routes>
					{publicRoute.map(({ path, Element }) => (
						<Route key={path} path={path} element={<Element />} />
					))}
					<Route path="*" element={<Auth />} />
				</Routes>
			)}
		</>
	)
}

export default AppRouter
