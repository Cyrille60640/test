import axios from 'axios'
const env = process.env.REACT_APP_API_DOMAIN,
	url = `${env}brand/`

const getAllBrands = async () => {
	return axios.get(url).then((res) => {
		return res.data
	})
}

export { getAllBrands }
