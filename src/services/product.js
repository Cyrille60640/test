import axios from 'axios'
const env = process.env.REACT_APP_API_DOMAIN,
	url = `${env}product/`

const createProduct = async (data) => {
	return axios.post(url, data).then((res) => {
		return res.data
	})
}

const getAllProducts = async (selector, value) => {
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
		return res.data
	})
}

export { createProduct, getAllProducts }
