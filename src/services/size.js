import axios from 'axios'
const env = process.env.REACT_APP_API_DOMAIN,
	url = `${env}size/`

const getAllSizes = async () => {
	return axios.get(url).then((res) => {
		return res.data
	})
}

export { getAllSizes }
