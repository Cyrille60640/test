import axios from 'axios'
import { refreshDatas } from '../utils/functions'
const env = process.env.REACT_APP_API_DOMAIN,
	url = `${env}customerGroup/`

const createCustomerGroup = async (data) => {
	return axios.post(url, data).then((res) => {
		return res.data.datas
	})
}

const getAllCustomerGroups = async () => {
	return axios.get(url).then((res) => {
		return res.data
	})
}

const refreshCustomersGroups = async (refreshDate, customersGroups) => {
	return axios.post(`${url}refreshValues`, { refreshDate }).then((res) => {
		let { status_code, datas } = res.data
		if (status_code === 200) {
			refreshDatas(datas, customersGroups)
		}
	})
}

export { createCustomerGroup, getAllCustomerGroups, refreshCustomersGroups }
