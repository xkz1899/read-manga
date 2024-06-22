import { useEffect } from "react"

import AppRouter from "./components/AppRouter"
import Container from "./components/container/Container"
import { useAppDispatch } from "./hooks/redux"
import { refresh } from "./modules/authorization"
import { Header } from "./modules/header"

const App = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (localStorage.getItem(`accessToken`)) {
			dispatch(refresh())
		}
	}, [])

	return (
		<>
			<Header />
			<Container>
				<AppRouter />
			</Container>
		</>
	)
}

export default App
