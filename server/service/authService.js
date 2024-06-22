const bcrypt = require("bcrypt")
const fs = require("fs")
const path = require("path")

const ApiError = require("../errors/apiError")
const { User, Role } = require("../models/models")
const dtoUser = require("../dto/userDto")
const roleService = require("./roleService")
const tokenService = require("./tokenService")

class AuthController {
	async handler(user) {
		const userDto = await new dtoUser(user)
		const tokens = tokenService.generateToken({ ...userDto })
		await tokenService.saveToken(tokens.refreshToken, userDto.id)
		return { ...tokens, user: userDto }
	}

	async registration(email, password, login) {
		const candidateEmail = await User.findOne({ where: { email } })
		const candidateLogin = await User.findOne({ where: { login } })
		if (candidateEmail) {
			throw ApiError.BadRequest(`Email exist in database.`)
		}
		if (candidateLogin) {
			throw ApiError.BadRequest(`Login exist in database.`)
		}
		const hashPassword = bcrypt.hashSync(password, 3)
		const user = await User.create({ email, password: hashPassword, login })

		const role = await roleService.getRoleUserOrCreate()
		await roleService.createUserRole(user.id, role.id)

		if (!fs.existsSync(path.resolve(__dirname, "..", "static"))) {
			fs.mkdir(path.resolve(__dirname, "..", "static"), err => {
				if (err) throw err
			})
		}
		const userPath = path.resolve(__dirname, "..", "static", user.id + "")
		fs.mkdir(userPath, err => {
			if (err) throw err
		})
		const userAndRole = await User.findOne({
			include: {
				model: Role,
				attributes: ["id", "role"],
				through: {
					attributes: [],
				},
			},
			required: true,
			where: { id: user.id },
		})
		return this.handler(userAndRole)
	}

	async login(email, password) {
		const user = await User.findOne({
			include: {
				model: Role,
				attributes: ["id", "role"],
				through: {
					attributes: [],
				},
			},
			where: { email },
		})
		if (!user) {
			throw ApiError.BadRequest(`User not found.`)
		}
		const comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			throw ApiError.BadRequest(`Password validation error.`)
		}
		return this.handler(user)
	}
	async logout(refreshToken) {
		await tokenService.removeToken(refreshToken)
	}
	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.Unauthorized()
		}
		const tokenDb = await tokenService.findToken(refreshToken)
		const userData = await tokenService.verifyRefreshToken(refreshToken)
		if (!tokenDb || !userData) {
			throw ApiError.Unauthorized()
		}
		const user = await User.findOne({
			include: {
				model: Role,
				attributes: ["id", "role"],
				through: {
					attributes: [],
				},
			},
			where: { id: userData.id },
		})

		return this.handler(user)
	}
}

module.exports = new AuthController()
