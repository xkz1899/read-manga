const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const User = sequelize.define(`user`, {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
	email: { type: DataTypes.STRING, unique: true, allowNull: false },
	login: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING, allowNull: false },
	image: { type: DataTypes.STRING },
	ban: { type: DataTypes.BOOLEAN, defaultValue: false },
	ban_message: { type: DataTypes.TEXT },
})

const Token = sequelize.define(`token`, {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
	refresh_token: { type: DataTypes.TEXT, allowNull: false },
})

const Role = sequelize.define(`role`, {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
	role: { type: DataTypes.STRING },
})

const UserRole = sequelize.define(`user_role`, {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
})

const Book = sequelize.define(`book`, {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
	release_date: { type: DataTypes.STRING },
	image: { type: DataTypes.TEXT },
	status: { type: DataTypes.STRING },
	name: { type: DataTypes.STRING },
	description: { type: DataTypes.TEXT },
	type: { type: DataTypes.STRING },
	likes: { type: DataTypes.INTEGER, defaultValue: 0 },
})
const Chapter = sequelize.define(`chapter`, {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
	name: { type: DataTypes.STRING },
	order: { type: DataTypes.INTEGER },
	likes: { type: DataTypes.INTEGER, defaultValue: 0 },
})

const ChapterLike = sequelize.define(`chapter_like`, {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
})

const ChapterPage = sequelize.define(`chapter_page`, {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
	image: { type: DataTypes.TEXT },
	order: { type: DataTypes.INTEGER },
})

const BookComment = sequelize.define(`book_comment`, {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
	text: { type: DataTypes.TEXT },
})
const ChapterComment = sequelize.define(`chapter_comment`, {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
	text: { type: DataTypes.TEXT },
})
const BookLike = sequelize.define(`book_like`, {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
})

const Genre = sequelize.define(`genre`, {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
	name: { type: DataTypes.STRING },
})
const BookGenre = sequelize.define(`book_genre`, {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
})

const RecommendationBook = sequelize.define(`recommendation_book`, {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
})

User.hasOne(Token)
Token.belongsTo(User)

User.belongsToMany(Role, { through: UserRole })
Role.belongsToMany(User, { through: UserRole })

Book.belongsToMany(Genre, { through: BookGenre })
Genre.belongsToMany(Book, { through: BookGenre })

Book.hasOne(BookLike)
BookLike.belongsTo(Book)

User.hasOne(BookLike)
BookLike.belongsTo(User)

Chapter.hasOne(ChapterLike)
ChapterLike.belongsTo(Chapter)

User.hasOne(ChapterLike)
ChapterLike.belongsTo(User)

User.hasOne(BookLike)
BookLike.belongsTo(User)

User.hasOne(Book)
Book.belongsTo(User)

Book.hasMany(Chapter)
Chapter.belongsTo(Book)

User.hasOne(Chapter)
Chapter.belongsTo(User)

Book.hasMany(BookComment)
BookComment.belongsTo(Book)

User.hasOne(BookComment)
BookComment.belongsTo(User)

Chapter.hasMany(ChapterComment)
ChapterComment.belongsTo(Chapter)

User.hasOne(ChapterComment)
ChapterComment.belongsTo(User)

Book.hasOne(RecommendationBook)
RecommendationBook.belongsTo(Book)

Chapter.hasMany(ChapterPage)
ChapterPage.belongsTo(Chapter)

User.hasOne(ChapterPage)
ChapterPage.belongsTo(User)

module.exports = {
	User,
	Role,
	Token,
	UserRole,
	Book,
	BookLike,
	ChapterLike,
	Chapter,
	ChapterPage,
	BookComment,
	Genre,
	BookGenre,
	ChapterComment,
	RecommendationBook,
}
