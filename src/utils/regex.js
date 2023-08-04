export const REGID = {
		value: /^[0-9]+$/,
		message: "N'utilisez que des chiffres."
	},
	REGNUM = {
		value: /^[0-9.]+$/,
		message: "N'utilisez que des chiffres et un point pour la décimal."
	},
	REGSTRING = {
		value: /^[a-zA-Z0-9éèçàùâêîûüëï ,'&."-]+$/,
		message:
			"N'utilisez que des lettres, chiffres et guillemets/apostrophes."
	}
