import axios from 'axios'
const env = process.env.REACT_APP_API_DOMAIN,
	url = `${env}product/`

const createProduct = async (data) => {
	return axios.post(url, data).then((res) => {
		return res.data
	})
}

const getAllProducts = async () => {
	// * Appel
	return axios.get(url).then((res) => {
		let { data } = res

		// * Population:
		// // data.datas.forEach((product) => {
		// // 	Object.keys(product).forEach((key) => {
		// // 		if (key.includes('id_')) {
		// // 			let varName = key.split('id_')[1]
		// // 			// ? if a retirer:
		// // 			console.log(items[`${varName}s`])
		// // 			if (!items[`${varName}s`] || varName !== 'main_product') {
		// // 				console.log(varName)
		// // 				throw Error
		// // 			}
		// // 			items[`${varName}s`].datas.every((item) => {
		// // 				if (item.id === product[key]) {
		// // 					product[varName] = item
		// // 					delete product[key]
		// // 					return false
		// // 				}
		// // 				return true
		// // 			})
		// // 		}
		// // 	})
		// // })

		// * Formattage:
		data.datas.forEach((product) => {
			let price = product.price.toString()
			price = `${price.substring(0, price.length - 2)}.${price.substring(
				price.length - 2,
				price.length
			)}`
			product.price = price
		})

		console.log(data.datas[0])

		return data
	})
}

export { createProduct, getAllProducts }
