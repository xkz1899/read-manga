import { useState } from "react"
import st from "./Logo.module.scss"
import { useNavigate } from "react-router-dom"
import { RouteName } from "../../../../routes"

const Logo = () => {
	const router = useNavigate()

	const [hoverActive, setHoverActive] = useState(false)

	return (
		<div>
			<button
				onMouseEnter={() => setHoverActive(true)}
				onMouseLeave={() => setHoverActive(false)}
				onMouseDown={() => setHoverActive(false)}
				onMouseUp={() => setHoverActive(true)}
				onClick={() => router(RouteName.MAIN)}
				className={st.logo}
			>
				<img
					className={st.logo__img}
					src={!hoverActive ? "/logo.png" : "/logo-active.png"}
					alt=""
				/>
			</button>
		</div>
	)
}

export default Logo
