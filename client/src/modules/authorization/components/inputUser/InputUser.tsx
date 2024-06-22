import React from "react"
import st from "./InputUser.module.scss"

interface IInputUser {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
	type: string
	placeholder: string
}

const InputUser = ({ value, setValue, type, placeholder }: IInputUser) => {
	return (
		<input
			className={st.input__user}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={e => setValue(e.target.value)}
		/>
	)
}

export default InputUser
