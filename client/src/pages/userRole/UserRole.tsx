import React from "react"
import { Users } from "../../modules/users"
import { useAppSelector } from "../../hooks/redux"

const UserRole = () => {
	const { currentUser } = useAppSelector(state => state.authReducer)
	return currentUser?.roles.find(f => f.role === "admin") ? <Users /> : <></>
}

export default UserRole
