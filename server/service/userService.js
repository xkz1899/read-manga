const { Op } = require("sequelize")
const uuid = require("uuid")
const path = require("path")
const fs = require("fs")

const { User, Role, Photo } = require("../models/models")

class UserService {
	async getAllUsers(id) {
		return await User.findAll({
			attributes: { exclude: ["password", "createdAt"] },
			where: {
				[Op.not]: { id },
			},
			order: [["updatedAt", "DESC"]],
		})
	}
	async getAll(limit, offset) {
		return await User.findAndCountAll({
			attributes: { exclude: ["password"] },
			distinct: true,
			include: {
				model: Role,
				attributes: ["id", "role"],
				through: {
					attributes: ["id"],
				},
			},
			limit,
			offset,
			order: [["createdAt", "DESC"]],
		})
	}

	async search(search, limit, offset) {
		return await User.findAndCountAll({
			attributes: { exclude: ["password"] },
			distinct: true,
			include: {
				model: Role,
				attributes: ["id", "role"],
				through: {
					attributes: [],
				},
			},
			where: {
				[Op.or]: [
					{
						email: {
							[Op.iLike]: "%" + search + "%",
						},
						login: {
							[Op.iLike]: "%" + search + "%",
						},
					},
				],
			},
			limit,
			offset,
			order: [["createdAt", "DESC"]],
		})
	}

	async banUser(id, ban, message) {
		await User.update({ ban, ban_message: message }, { where: { id } })
	}

	async getUser(id) {
		return await User.findOne({ where: { id } })
	}

	async editInfo(
		name,
		surname,
		date_birth,
		id,
		status,
		place_work,
		phone_number,
		telegram,
		university,
		faculty
	) {
		const user = await User.findOne({ where: { id } })
		if (name === null) {
			name = user.name
		}
		if (surname === null) {
			name = user.surname
		}
		if (date_birth === null) {
			name = user.date_birth
		}
		if (status === null) {
			name = user.status
		}
		if (place_work === null) {
			name = user.place_work
		}
		if (phone_number === null) {
			name = user.phone_number
		}
		if (telegram === null) {
			name = user.telegram
		}
		if (university === null) {
			name = user.university
		}
		if (faculty === null) {
			name = user.faculty
		}
		await User.update(
			{
				name,
				surname,
				date_birth,
				status,
				place_work,
				phone_number,
				telegram,
				university,
				faculty,
			},
			{ where: { id } }
		)
		return "The user's data has been successfully changed"
	}
	async editAvatar(image, id) {
		let imgName = null
		if (image) {
			const imgType = image.name.split(".").at(-1)
			imgName = uuid.v4() + "." + imgType
		}
		const pathImg = path.resolve(__dirname, "..", "static", id + "", imgName)
		const user = await User.findOne({ where: { id } })
		if (user.image) {
			this.deleteAvatar(user.image, id)
		}
		if (image) {
			image.mv(pathImg)
		}
		await Photo.create({ name: imgName, userId: id })
		if (
			!fs.existsSync(path.resolve(__dirname, "..", "static", id + "", "image"))
		) {
			fs.mkdirSync(path.resolve(__dirname, "..", "static", id + "", "image"))
		}
		image.mv(path.resolve(__dirname, "..", "static", id + "", "image", imgName))
		return await User.update({ image: imgName }, { where: { id } })
	}

	async deleteAvatar(image, id) {
		const user = await User.findOne({ where: { id } })
		if (user) {
			if (user.image) {
				fs.unlinkSync(path.resolve(__dirname, "..", "static", id + "", image))
			}
		}
		return
	}
	geImgPath(id, img) {
		return path.resolve(__dirname, "..", "static", id + "", "image", img)
	}
	async lastSeenUpdate(id) {
		await User.update({ where: { id } }, { last_seen: new Date() })
	}
	async getRoles() {
		return await Role.findAll()
	}
}

module.exports = new UserService()
