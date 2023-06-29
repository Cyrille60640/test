import axios from 'axios'
const env = process.env.REACT_APP_API_DOMAIN,
	url = `${env}product/`

const createProduct = async (data) => {
	return axios.post(url, data).then((res) => {
		return res.data
	})
}

const getAllProducts = async (items, selector, value) => {
	// * Détermination de l'url:
	let urlToGET = url
	if (selector) {
		urlToGET += `/${selector}`
		if (value) {
			urlToGET += `/${value}`
		}
	}

	// * Appel
	return axios.get(urlToGET).then((res) => {
		let { data } = res,
			datasToReturn = []

		// * Population:
		data.datas.forEach((product) => {
			Object.keys(items).forEach((key) => {
				items[key].datas.forEach((item) => {
					let itemName = key.substring(0, key.length - 1)
					if (product[itemName].id === item.id) {
						product[itemName] = item
						return delete product[itemName].id
					}
				})
			})

			datasToReturn.push(product)
		})

		return { ...data, datas: datasToReturn }
	})
}

export { createProduct, getAllProducts }
