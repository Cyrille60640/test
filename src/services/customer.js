import axios from 'axios'
const env = process.env.REACT_APP_API_DOMAIN,
	url = `${env}customer/`

const createOneCustomer = async (data) => {
	let { customerGroup, customerType, tvaType } = data,
		body = {
			...data,
			id_customer_group: customerGroup.value,
			id_customer_type: customerType.value,
			id_tva_type: tvaType.value
		}

	delete body.customerGroup
	delete body.customerType
	delete body.tvaType

	return axios.post(url, body).then((res) => {
		return res.data
	})
}

const getAllCustomers = async () => {
	return axios.get(url).then((res) => {
		// On formate les requiredFeatures:
		let { datas, status_code } = res.data

		if (status_code === 200) {
			datas.forEach((data) => {
				let requiredFeatures = {}
				data.requiredFeatures.forEach((feature) => {
					requiredFeatures[feature.field] = feature
				})
				data.requiredFeatures = requiredFeatures
			})
		}

		return res.data
	})
}

const uploadCustomerLogo = async (data, id) => {
	// * Création du Form Data:
	let formData = new FormData()
	// Object.keys(data).forEach((key) => {
	// 	if (key === 'logo' && data[key][0] !== undefined) {
	// 		formData.append(key, data[key][0])
	// 	}
	// })

	console.log(data)

	formData.append('logo', data['logo'])

	// formData.entries().forEach((entry) => {
	// 	console.log(entry)
	// })

	// * Call API:
	return axios.post(`${url}uploadPhotos/${id}`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

export { createOneCustomer, getAllCustomers, uploadCustomerLogo }
