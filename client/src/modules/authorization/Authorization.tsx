import { useState } from "react"

import { useAppDispatch } from "../../hooks/redux"
import st from "./Authorization.module.scss"
import Error from "./components/error/Error"
import InputPassword from "./components/inputPassword/InputPassword"
import InputUser from "./components/inputUser/InputUser"
import SelectPage from "./components/selectPage/SelectPage"
import { login, registration } from "./service/authService"

const Authorization = () => {
	const [emailValue, setEmailValue] = useState("")
	const [loginValue, setLoginValue] = useState("")
	const [passwordValue, setPasswordValue] = useState("")
	const [statePage, setStatePage] = useState("login")

	const dispatch = useAppDispatch()

	const loginHandler = () => {
		dispatch(login(emailValue, passwordValue))
	}
	const registrationHandler = () => {
		dispatch(registration(emailValue, loginValue, passwordValue))
	}

	return (
		<div className={st.wrap}>
			<Error />
			{statePage === "login" && <h1>Login</h1>}
			{statePage === "registration" && <h1>Registration</h1>}
			<div className={st.form}>
				<InputUser
					value={emailValue}
					setValue={setEmailValue}
					placeholder="Enter email..."
					type="email"
				/>
				{statePage === "registration" && (
					<InputUser
						value={loginValue}
						setValue={setLoginValue}
						placeholder="Enter login..."
						type="text"
					/>
				)}
				<InputPassword
					password={passwordValue}
					setPassword={setPasswordValue}
				/>
				{statePage === "login" && <button onClick={loginHandler}>Login</button>}
				{statePage === "registration" && (
					<button onClick={registrationHandler}>Registration</button>
				)}
			</div>
			<SelectPage statePage={statePage} setStatePage={setStatePage} />
		</div>
	)
}

export default Authorization
