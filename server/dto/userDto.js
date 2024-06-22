module.exports = class UserDto {
	id
	email
	login
	roles
	ban
	banMessage
	image
	dateOfBirth
	name
	surname
	status
	placeWork
	phoneNumber
	telegram
	university
	faculty
	lastSeen
	constructor(model) {
		this.id = model.id
		this.email = model.email
		this.login = model.login
		this.roles = model.roles
		this.ban = model.ban
		this.banMessage = model.ban_message
		this.dateBirth = model.date_birth
		this.name = model.name
		this.surname = model.surname
		this.image = model.image
		this.status = model.status
		this.placeWork = model.place_work
		this.phoneNumber = model.phone_number
		this.telegram = model.telegram
		this.university = model.university
		this.faculty = model.faculty
		this.lastSeen = model.last_seen
	}
}
