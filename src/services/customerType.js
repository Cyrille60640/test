import axios from 'axios'
const env = process.env.REACT_APP_API_DOMAIN,
	url = `${env}customerType/`

const getAllCustomerTypes = async () => {
	return axios.get(url).then((res) => {
		return res.data
	})
}

export { getAllCustomerTypes }
