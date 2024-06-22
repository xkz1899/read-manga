export interface IComment {
	id: number
	text: string
	createdAt: string
	updatedAt: string
	bookId: number
	userId: number
	user: User
}

interface User {
	id: number
	login: string
}
