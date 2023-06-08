import axios from 'axios'
// // import { refreshDatas } from '../utils/functions'
const env = process.env.REACT_APP_API_DOMAIN,
	url = `${env}box/`

const createBox = async (data) => {
	return axios.post(url, data).then((res) => {
		return res.data.datas
	})
}

// // const refreshBoxs = async (refreshDate, boxs) => {
// // 	return axios.post(`${url}refreshValues`, { refreshDate }).then((res) => {
// // 		let { status_code, datas } = res.data
// // 		if (status_code === 200) {
// // 			refreshDatas(datas, boxs)
// // 		}
// // 	})
// // }

export {
	createBox
	// // refreshBoxs
}
