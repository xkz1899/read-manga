import React from "react"
import st from "./SelectPage.module.scss"

interface ISelectPage {
	statePage: string
	setStatePage: React.Dispatch<React.SetStateAction<string>>
}

const SelectPage = ({ statePage, setStatePage }: ISelectPage) => {
	return (
		<div className={st.select}>
			{statePage === "login" && (
				<p>
					Don't have an account yet?{" "}
					<button
						className={st.btn}
						onClick={() => setStatePage("registration")}
					>
						Register.
					</button>
				</p>
			)}
			{statePage === "registration" && (
				<p>
					Already have an account?{" "}
					<button className={st.btn} onClick={() => setStatePage("login")}>
						Login
					</button>
				</p>
			)}
		</div>
	)
}

export default SelectPage
