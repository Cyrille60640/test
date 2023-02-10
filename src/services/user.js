import axios from 'axios'
const env = process.env.REACT_APP_API_DOMAIN,
	url = `${env}user/`

const checkBearer = async () => {
	return axios.get(`${url}checkBearer`).then((res) => {
		return res.data
	})
}

export { checkBearer }
