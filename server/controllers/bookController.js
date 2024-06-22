const bookService = require("../service/bookService")
const ApiError = require("../errors/apiError")

class BookController {
	async getCatalog(req, res, next) {
		try {
			const {
				status,
				genre,
				type,
				page = 1,
				limit = 9,
				sort = `createdAt:DESC`,
			} = req.query
			let offset = page * limit - limit

			const result = await bookService.getCatalog(
				status,
				genre,
				type,
				limit,
				offset,
				sort
			)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async createBook(req, res, next) {
		try {
			const { release_date, status, name, description, type } = req.body
			const { image } = req.files
			const result = await bookService.createBook(
				release_date,
				status,
				name,
				description,
				type,
				image,
				req.user.id
			)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async createChapter(req, res, next) {
		try {
			const { name, order, bookId } = req.body
			const result = await bookService.createChapter(
				name,
				order,
				bookId,
				req.user.id
			)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async createCharterPage(req, res, next) {
		try {
			const { order, chapterId } = req.body
			const { image } = req.files
			const result = await bookService.createCharterPage(
				order,
				image,
				chapterId,
				req.user.id
			)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async createGenre(req, res, next) {
		try {
			const { name } = req.body
			const result = await bookService.createGenre(name)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async connectBookGenre(req, res, next) {
		try {
			const { bookId, genreId } = req.body
			const result = await bookService.connectBookGenre(bookId, genreId)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getChapter(req, res, next) {
		try {
			const { bookId } = req.query
			const result = await bookService.getChapter(bookId)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getCharterPage(req, res, next) {
		try {
			const { chapterId } = req.query
			const result = await bookService.getCharterPage(chapterId)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getGenre(req, res, next) {
		try {
			const result = await bookService.getGenre()
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getBook(req, res, next) {
		try {
			const result = await bookService.getBook(req.query.id)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async deleteChapterPage(req, res, next) {
		try {
			const result = await bookService.deleteChapterPage(req.params.id)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async editOrderPage(req, res, next) {
		try {
			const { id, order } = req.body
			const result = await bookService.editOrderPage(id, order)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async addLikeChapter(req, res, next) {
		try {
			const { chapterId } = req.params
			const result = await bookService.addLikeChapter(chapterId, req.user.id)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async addCommentBook(req, res, next) {
		try {
			const { bookId, text } = req.body
			const result = await bookService.addCommentBook(bookId, text, req.user.id)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getCommentBook(req, res, next) {
		try {
			const { bookId, page = 1, limit = 9 } = req.query
			let offset = page * limit - limit
			const result = await bookService.getCommentBook(bookId, limit, offset)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async deleteCommentBook(req, res, next) {
		try {
			const { id } = req.params
			const result = await bookService.deleteCommentBook(id)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async addCommentChapter(req, res, next) {
		try {
			const { chapterId, text } = req.body
			const result = await bookService.addCommentChapter(
				chapterId,
				text,
				req.user.id
			)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getCommentChapter(req, res, next) {
		try {
			const { chapterId, limit = 9 } = req.query
			const result = await bookService.getCommentChapter(chapterId, limit)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async deleteCommentChapter(req, res, next) {
		try {
			const { id } = req.params
			const result = await bookService.deleteCommentChapter(id)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async deleteConnectBookGenre(req, res, next) {
		try {
			const { id } = req.params
			const result = await bookService.deleteConnectBookGenre(id)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async deleteChapter(req, res, next) {
		try {
			const { id } = req.params
			const result = await bookService.deleteChapter(id)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async editChapter(req, res, next) {
		try {
			const { id, name, order = null } = req.body
			const result = await bookService.editChapter(id, name, JSON.parse(order))
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async deleteBook(req, res, next) {
		try {
			const { id } = req.params
			const result = await bookService.deleteBook(id)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async editBook(req, res, next) {
		try {
			const { id, name, description, type, status, release_date } = req.body
			const result = await bookService.editBook(
				id,
				name,
				description,
				type,
				status,
				release_date
			)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async addRecommendation(req, res, next) {
		try {
			const { bookId } = req.body
			const result = await bookService.addRecommendation(bookId)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async getRecommendation(req, res, next) {
		try {
			const result = await bookService.getRecommendation()
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async deleteRecommendation(req, res, next) {
		try {
			const result = await bookService.deleteRecommendation(req.params.id)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
	async checkRecommendation(req, res, next) {
		try {
			const result = await bookService.checkRecommendation(req.query.id)
			return res.json(result)
		} catch (err) {
			next(ApiError.BadRequest(err.message))
		}
	}
}

module.exports = new BookController()
