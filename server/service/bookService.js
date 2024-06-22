const {
	User,
	Book,
	Chapter,
	ChapterPage,
	Genre,
	BookGenre,
	BookComment,
	ChapterLike,
	ChapterComment,
	RecommendationBook,
} = require("../models/models")
const path = require("path")
const fs = require("fs")
const uuid = require("uuid")
const { Op } = require("sequelize")

class BookService {
	async createBook(
		release_date,
		status,
		name,
		description,
		type,
		image,
		userId
	) {
		let imgName = ""
		if (image) {
			const imgType = image.name.split(".").at(-1)
			imgName = uuid.v4() + "." + imgType
		}
		const result = await Book.create({
			release_date,
			status,
			name,
			description,
			type,
			image: imgName,
			userId,
		})
		const imgFolder = path.resolve(__dirname, "..", "static", "books")
		const imgFolderId = path.resolve(
			__dirname,
			"..",
			"static",
			"books",
			result.id + ""
		)
		if (!fs.existsSync(imgFolder)) {
			fs.mkdir(path.resolve(imgFolder), err => {
				if (err) throw err
			})
		}
		if (imgFolderId) {
			fs.mkdir(path.resolve(imgFolderId), err => {
				if (err) throw err
			})
		}
		if (image) {
			image.mv(
				path.resolve(
					__dirname,
					"..",
					"static",
					"books",
					result.id + "",
					imgName
				)
			)
		}
		return result
	}
	async createChapter(name, order, bookId, userId) {
		const exists = await Chapter.findOne({ where: { order, bookId } })
		let result = null
		if (!exists) {
			result = await Chapter.create({ name, order, bookId, userId })
			const imgFolder = path.resolve(
				__dirname,
				"..",
				"static",
				"books",
				bookId + "",
				result.id + ""
			)
			if (!fs.existsSync(imgFolder)) {
				fs.mkdir(path.resolve(imgFolder), err => {
					if (err) throw err
				})
			}
		}
		return result
	}
	async createCharterPage(order, image, chapterId, userId) {
		const exist = await Chapter.findOne({ where: { id: chapterId } })
		if (exist) {
			let imgName = ""
			if (image) {
				const imgType = image.name.split(".").at(-1)
				imgName = uuid.v4() + "." + imgType
			}
			const result = await ChapterPage.create({
				chapterId,
				order,
				image: imgName,
				userId,
			})
			if (image) {
				image.mv(
					path.resolve(
						__dirname,
						"..",
						"static",
						"books",
						exist.bookId + "",
						exist.id + "",
						imgName
					)
				)
			}
			return result
		}
		return null
	}
	async getCatalog(
		status = null,
		genre = null,
		type = null,
		limit,
		offset,
		sort
	) {
		let result = null
		const [sortOption, sortOrder] = sort.split(`:`)

		if (!status && !genre && !type) {
			result = await Book.findAndCountAll({
				limit,
				offset,
				order: [[sortOption, sortOrder]],
			})
		}
		if (status && !genre && !type) {
			result = await Book.findAndCountAll({
				where: { status },
				include: { model: Genre, through: { attributes: [] } },
				required: true,
				limit,
				offset,
				order: [[sortOption, sortOrder]],
			})
		}
		if (!status && !genre && type) {
			result = await Book.findAndCountAll({
				where: { type },
				include: { model: Genre, through: { attributes: [] } },
				required: true,
				limit,
				offset,
				order: [[sortOption, sortOrder]],
			})
		}
		if (status && !genre && type) {
			result = await Book.findAndCountAll({
				where: { type, status },
				include: { model: Genre, through: { attributes: [] } },
				required: true,
				limit,
				offset,
				order: [[sortOption, sortOrder]],
			})
		}
		if (!status && genre && !type) {
			result = await Book.findAndCountAll({
				include: {
					model: Genre,
					through: { attributes: [] },
					where: { id: { [Op.or]: JSON.parse(genre) } },
				},
				required: true,
				limit,
				offset,
				order: [[sortOption, sortOrder]],
			})
		}
		if (status && genre && !type) {
			result = await Book.findAndCountAll({
				where: { status },
				include: {
					model: Genre,
					through: { attributes: [] },
					where: { id: { [Op.or]: JSON.parse(genre) } },
				},
				required: true,
				limit,
				offset,
				order: [[sortOption, sortOrder]],
			})
		}
		if (!status && genre && type) {
			result = await Book.findAndCountAll({
				where: { type },
				include: {
					model: Genre,
					through: { attributes: [] },
					where: { id: { [Op.or]: JSON.parse(genre) } },
				},
				required: true,
				limit,
				offset,
				order: [[sortOption, sortOrder]],
			})
		}
		if (status && genre && type) {
			result = await Book.findAndCountAll({
				where: { type, status },
				include: {
					model: Genre,
					through: { attributes: [] },
					where: { id: { [Op.or]: JSON.parse(genre) } },
				},
				required: true,
				limit,
				offset,
				order: [[sortOption, sortOrder]],
			})
		}

		return result
	}
	async getChapter(bookId) {
		const result = await Chapter.findAndCountAll({
			where: { bookId },
			order: [["order", "DESC"]],
		})
		return result
	}
	async getCharterPage(chapterId) {
		const result = await ChapterPage.findAndCountAll({
			where: { chapterId },
			order: [["order", "ASC"]],
		})
		return result
	}
	async createGenre(name) {
		const genre = await Genre.findOne({ where: { name } })
		if (name && !genre) {
			return await Genre.create({ name })
		}
		return null
	}
	async connectBookGenre(bookId, genreId) {
		return await BookGenre.create({ bookId, genreId })
	}
	async getGenre() {
		return await Genre.findAndCountAll()
	}
	async getBook(id) {
		return await Book.findOne({
			where: { id },
			include: [
				{ model: Genre, through: { attributes: ["id"] } },
				{ model: Chapter },
				{ model: BookComment },
			],
			order: [[Chapter, "order", "DESC"]],
		})
	}
	async deleteChapterPage(id) {
		const page = await ChapterPage.findOne({ where: { id } })
		const chapter = await Chapter.findOne({ where: { id: page.chapterId } })

		if (page.image) {
			const imagePath = path.resolve(
				__dirname,
				"..",
				"static",
				"books",
				chapter.bookId + "",
				chapter.id + "",
				page.image
			)
			if (fs.existsSync(imagePath)) {
				fs.unlinkSync(imagePath)
			}
		}
		return await ChapterPage.destroy({ where: { id } })
	}
	async addLikeChapter(chapterId, userId) {
		const exist = await ChapterLike.findOne({ where: { chapterId, userId } })
		if (exist) {
			await ChapterLike.destroy({ where: { userId, chapterId } })
		} else {
			await ChapterLike.create({ chapterId, userId })
		}
		const likes = await ChapterLike.count({ where: { chapterId } })
		await Chapter.update({ likes }, { where: { id: chapterId } })
		return await Chapter.findOne({ where: { id: chapterId } })
	}
	async editOrderPage(id, order) {
		await ChapterPage.update({ order }, { where: { id } })
		return await ChapterPage.findOne({ where: { id } })
	}
	async addCommentBook(bookId, text, userId) {
		const comment = await BookComment.create({ bookId, text, userId })
		const result = await BookComment.findOne({
			where: { id: comment.id },
			include: { model: User, attributes: ["id", "login"] },
		})
		return result
	}
	async getCommentBook(bookId, limit, offset) {
		return await BookComment.findAndCountAll({
			where: { bookId },
			include: { model: User, attributes: ["id", "login"] },
			limit,
			offset,
			order: [["createdAt", "DESC"]],
		})
	}
	async deleteCommentBook(id) {
		return await BookComment.destroy({ where: { id } })
	}
	async addCommentChapter(chapterId, text, userId) {
		const comment = await ChapterComment.create({ chapterId, text, userId })
		return await ChapterComment.findOne({
			where: { id: comment.id },
			include: { model: User, attributes: ["id", "login"] },
		})
	}
	async getCommentChapter(chapterId, limit) {
		return await ChapterComment.findAndCountAll({
			where: { chapterId },
			include: { model: User, attributes: ["id", "login"] },
			limit,
			order: [["createdAt", "DESC"]],
		})
	}
	async deleteCommentChapter(id) {
		return await ChapterComment.destroy({ where: { id } })
	}
	async deleteConnectBookGenre(id) {
		return await BookGenre.destroy({ where: { id } })
	}
	async deleteChapter(id) {
		const chapter = await Chapter.findOne({ where: { id } })
		if (chapter) {
			const pages = await ChapterPage.findAll({ where: { chapterId: id } })
			await ChapterLike.destroy({ where: { chapterId: id } })
			await ChapterComment.destroy({ where: { chapterId: id } })
			for (let i = 0; i < pages.length; i++) {
				await this.deleteChapterPage(pages[i].id)
			}
			await Chapter.destroy({ where: { id } })
			const imagePath = path.resolve(
				__dirname,
				"..",
				"static",
				"books",
				chapter.bookId + "",
				chapter.id + ""
			)
			fs.rmdirSync(imagePath)
			return
		}
		return null
	}
	async editChapter(id, name, order) {
		const chapter = await Chapter.findOne({ where: { id } })
		if (!order) {
			order = chapter.order
		}
		await Chapter.update({ name, order }, { where: { id } })
		await Chapter.findOne({
			where: { id },
		})
	}
	async deleteBook(id) {
		const book = await Book.findOne({ where: { id } })
		if (book) {
			const chapters = await Chapter.findAll({ where: { bookId: id } })
			await BookComment.destroy({ where: { bookId: id } })
			for (let i = 0; i < chapters.length; i++) {
				await this.deleteChapter(chapters[i].id)
			}
			await Book.destroy({ where: { id } })
			const imagePath = path.resolve(
				__dirname,
				"..",
				"static",
				"books",
				id + "",
				book.image
			)
			const bookFolder = path.resolve(
				__dirname,
				"..",
				"static",
				"books",
				id + ""
			)
			fs.unlinkSync(imagePath)
			fs.rmdirSync(bookFolder)
			return
		}
		return null
	}
	async editBook(id, name, description, type, status, release_date) {
		await Book.update(
			{ name, description, type, status, release_date },
			{ where: { id } }
		)
		return this.getBook(id)
	}
	async addRecommendation(bookId) {
		const recommendation = await RecommendationBook.create({ bookId })
		return await RecommendationBook.findOne({
			where: { id: recommendation.id },
			include: { model: { Book } },
		})
	}
	async getRecommendation() {
		return await RecommendationBook.findAll({
			attributes: ["id"],
			include: { model: Book },
		})
	}
	async deleteRecommendation(bookId) {
		await RecommendationBook.destroy({ where: { bookId } })
	}
	async checkRecommendation(bookId) {
		return await RecommendationBook.findOne({ where: { bookId } })
	}
}

module.exports = new BookService()
