import { useState, useEffect } from 'react'
import { Table } from '../../../components/templates'
import axios from 'axios'

const NewOnlineSales = () => {
	// * Déclarations:
	const [sales, setSales] = useState([])

	useEffect(() => {
		// let data = JSON.stringify({
		// 	email: 'admin@wholistic.fr',
		// 	password: 'pC!9HCPwpNuu>L>?REk6'
		// })
		// let config = {
		// 	method: 'post',
		// 	maxBodyLength: Infinity,
		// 	url: 'https://shop.sapee.fr/api/v2/admin/authentication-token',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		withCredentials: true
		// 	},
		// 	data: data
		// }
		// axios
		// 	.request(config)
		// 	.then((response) => {
		// 		console.log(JSON.stringify(response.data))
		// 	})
		// 	.catch((error) => {
		// 		console.log(error)
		// 	})
		// ?
		// axios
		// 	.post('https://shop.sapee.fr/api/v2/admin/authentication-token', {
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		data: JSON.stringify({
		// 			email: 'admin@wholistic.fr',
		// 			password: 'pC!9HCPwpNuu>L>?REk6'
		// 		})
		// 	})
		// 	.then((res) => {
		// 		console.log(res)
		// 	})
	}, [])

	return (
		<Table
			columns={[]}
			datas={sales}
			title={'Ventes en ligne'}
			keysForCSV={[]}
			csvName={'onlineSales'}
		/>
	)
}

export default NewOnlineSales
