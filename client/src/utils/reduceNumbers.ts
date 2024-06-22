export const reduceNumbers = (num: number) => {
	if (num < 1000) {
		return num.toString()
	}
	if (num >= 1000 && num < 10000) {
		return num.toString().slice(0, 2).split("").join(".") + "K"
	}
	if (num >= 10000 && num < 100000) {
		return (
			num
				.toString()
				.slice(0, 3)
				.split("")
				.map((it, i) => (i === 1 ? it + "." : it))
				.join("") + "K"
		)
	}
	if (num >= 100000 && num < 1000000) {
		return (
			num
				.toString()
				.slice(0, 4)
				.split("")
				.map((it, i) => (i === 2 ? it + "." : it))
				.join("") + "K"
		)
	}
	if (num >= 1000000 && num < 10000000) {
		return num.toString().slice(0, 2).split("").join(".") + "M"
	}
	if (num >= 10000000 && num < 100000000) {
		return (
			num
				.toString()
				.slice(0, 4)
				.split("")
				.map((it, i) => (i === 1 ? it + "." : it))
				.join("") + "M"
		)
	}
	if (num >= 100000000 && num < 1000000000) {
		return (
			num
				.toString()
				.slice(0, 4)
				.split("")
				.map((it, i) => (i === 2 ? it + "." : it))
				.join("") + "M"
		)
	}
	if (num >= 1000000000 && num < 10000000000) {
		return num.toString().slice(0, 2).split("").join(".") + "B"
	}
	if (num >= 10000000000 && num < 100000000000) {
		return (
			num
				.toString()
				.slice(0, 4)
				.split("")
				.map((it, i) => (i === 1 ? it + "." : it))
				.join("") + "B"
		)
	}
	if (num >= 100000000000 && num < 1000000000000) {
		return (
			num
				.toString()
				.slice(0, 4)
				.split("")
				.map((it, i) => (i === 2 ? it + "." : it))
				.join("") + "B"
		)
	}
}
