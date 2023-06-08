const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array)
	}
}

const sortByName = (array) => {
	array.sort(function compare(a, b) {
		if (a.name < b.name) return -1
		if (a.name > b.name) return 1
		return 0
	})

	return array
}

const formateOptions = (options) => {
	if (options) {
		// * Triage par ordre alphabétique:
		options = sortByName(options)

		// * Formatage des propriétés:
		options.forEach((option) => {
			let { id, name, ref, social_reason, universal_size } = option
			option.value = id
			delete option.id
			if (name) {
				option.label = name
				delete option.name
			} else if (ref) {
				option.label = ref
				delete option.ref
			} else if (social_reason) {
				option.label = social_reason
				delete option.social_reason
			} else if (universal_size) {
				option.label = universal_size
				delete option.universal_size
			}
		})
	}

	return options
}

// Fonction pour masquer/demasquer un element:
const handleElementDisplay = (mode, idsToDNone, classesToDNone) => {
	if (idsToDNone) {
		if (mode === 'add') {
			idsToDNone.forEach((id) => {
				document.querySelector(`#${id}`).classList.add('d-none')
			})
		} else {
			idsToDNone.forEach((id) => {
				document.querySelector(`#${id}`).classList.remove('d-none')
			})
		}
	}

	if (classesToDNone) {
		if (mode === 'add') {
			classesToDNone.forEach((iteration) => {
				document.querySelector(`.${iteration}`).classList.add('d-none')
			})
		} else {
			classesToDNone.forEach((iteration) => {
				document
					.querySelector(`.${iteration}`)
					.classList.remove('d-none')
			})
		}
	}
}

const refreshDatas = (datasToManage, state) => {
	// * Création d'un objet intermédiaire et d'une nouvelle date de rafraichissement:
	let datasToState = JSON.parse(JSON.stringify(state)),
		refreshDate = new Date().toISOString()

	// * On check si la value existe déjà (et donc à été mise-à-jour):
	datasToManage.forEach((data) => {
		let valueAlreadyExists = false
		datasToState.datas.forEach((stateData, index, array) => {
			if (data.id === stateData.id) {
				valueAlreadyExists = true
				array[index] = data
			}
		})

		// * On avise selon l'existance préalable de la value:
		if (valueAlreadyExists) {
			datasToState.options.forEach((option, index, array) => {
				if (data.id === option.value) {
					array[index] = {
						...data,
						value: data.id,
						label: data.name
					}
				}
			})
		} else {
			datasToState.datas.push(data)
			datasToState.options.push({
				...data,
				value: data.id,
				label: data.name
			})
		}
	})

	state.setter({
		...state,
		datas: datasToState.datas,
		options: datasToState.options,
		refreshDate
	})
}

export {
	asyncForEach,
	formateOptions,
	sortByName,
	handleElementDisplay,
	refreshDatas
}
