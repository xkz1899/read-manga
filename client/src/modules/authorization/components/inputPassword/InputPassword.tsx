import React, { useState } from "react"
import { IoEye, IoEyeOff } from "react-icons/io5"

import st from "./InputPassword.module.scss"

interface IInputPassword {
	password: string
	setPassword: React.Dispatch<React.SetStateAction<string>>
}

const InputPassword = ({ password, setPassword }: IInputPassword) => {
	const [isVisible, setVisible] = useState(false)

	return (
		<div className={st.password}>
			<input
				placeholder="Enter password..."
				type={isVisible ? "text" : "password"}
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<button
				tabIndex={-1}
				title={isVisible ? "Hide" : "Show"}
				onClick={() => setVisible(!isVisible)}
			>
				{!isVisible ? <IoEye /> : <IoEyeOff />}
			</button>
		</div>
	)
}

export default InputPassword
