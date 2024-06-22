const userService = require("../service/userService")
const ApiError = require("../errors/apiError")

class UserController {
	async getAllUser(req, res, next) {
		try {
			const { page = 1, limit = 9 } = req.query
			let offset = page * limit - limit
			const users = await userService.getAll(limit, offset)
			res.json(users)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async getAll(req, res, next) {
		try {
			const users = await userService.getAllUsers(req.user.id)
			return res.json(users)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async searchUser(req, res, next) {
		try {
			const { search, page = 1, limit = 9 } = req.query
			let offset = page * limit - limit
			const users = await userService.search(search, limit, offset)
			res.json(users)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async bannedUser(req, res, next) {
		try {
			const { id, ban = null, message = "" } = req.body
			await userService.banUser(id, JSON.parse(ban), message)
			res.json({ message: `User banned.` })
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}

	async getUser(req, res, next) {
		try {
			const { id } = req.params
			const response = await userService.getUser(id)
			res.json(response)
		} catch (err) {
			next(err)
		}
	}
	async editInfo(req, res, next) {
		try {
			const {
				name,
				surname,
				dateBirth,
				status,
				placeWork,
				phoneNumber,
				telegram,
				university,
				faculty,
			} = req.body
			const response = await userService.editInfo(
				name,
				surname,
				dateBirth,
				req.user.id,
				status,
				placeWork,
				phoneNumber,
				telegram,
				university,
				faculty
			)
			res.json(response)
		} catch (err) {
			next(err)
		}
	}
	async editAvatar(req, res, next) {
		try {
			const { image } = req.files
			const response = await userService.editAvatar(image, req.user.id)
			res.json(response)
		} catch (err) {
			next(err)
		}
	}
	async lastSeenUpdate(req, res, next) {
		try {
			const response = await userService.lastSeenUpdate(req.user.id)
			res.json(response)
		} catch (err) {
			next(err)
		}
	}
	async getRoles(req, res, next) {
		try {
			const response = await userService.getRoles()
			res.json(response)
		} catch (err) {
			next(err)
		}
	}
}

module.exports = new UserController()
