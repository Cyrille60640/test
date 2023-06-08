import axios from 'axios'
const env = process.env.REACT_APP_API_DOMAIN,
	url = `${env}season/`

const getAllSeasons = async () => {
	return axios.get(url).then((res) => {
		return res.data
	})
}

export { getAllSeasons }
