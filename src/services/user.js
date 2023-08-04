import axios from 'axios'
const env = process.env.REACT_APP_API_DOMAIN,
	url = `${env}user/`

const authenticateUser = async (data) => {
	return axios.post(`${url}authenticate`, data).then((res) => {
		let { data, status } = res
		if (status === 200) {
			localStorage.setItem(
				'REACT_TOKEN_AUTH_TRI_ECOTEXTILE',
				JSON.stringify(data.token)
			)
			window.location.reload(false)
		}
	})
}

const checkBearer = async () => {
	return axios.get(`${url}checkBearer`).then((res) => {
		return res.data
	})
}

export { authenticateUser, checkBearer }
