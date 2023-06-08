import axios from 'axios'
const env = process.env.REACT_APP_API_DOMAIN,
	url = `${env}print/`

const getAllPrints = async () => {
	return axios.get(url).then((res) => {
		return res.data
	})
}

export { getAllPrints }
