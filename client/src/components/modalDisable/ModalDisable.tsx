import React from "react"
import st from "./ModalDisable.module.scss"

interface IModalDisable {
	children: React.ReactNode
}

const ModalDisable = ({ children }: IModalDisable) => {
	return (
		<div className={st.wrap}>
			<div className={st.main}>{children}</div>
		</div>
	)
}

export default ModalDisable
