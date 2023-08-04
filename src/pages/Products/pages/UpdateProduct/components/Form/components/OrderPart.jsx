import { Controller } from 'react-hook-form'
import { Select } from '../../../../../../../components/templates'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { returnApiResponseError } from '../../../../../../../util/functions'

const OrderPart = ({ control, setApiResponse, setRequiredFeatures }) => {
	// Récupération des commandes:
	const [orderOptions, setOrderOptions] = useState([])
	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_DOMAIN + 'order')
			.then((res) => {
				let orderOptionsToState = []
				res.data.datas.forEach((order) => {
					orderOptionsToState.push({
						value: order.id,
						label: order.ref
					})
				})
				setOrderOptions(orderOptionsToState)
			})
			.catch((error) => {
				setApiResponse(returnApiResponseError(error))
			})
	}, [])

	const handleOrderChange = async (value) => {
		try {
			let response = await axios.get(
				`${process.env.REACT_APP_API_DOMAIN}order/${value}`
			)

			response = await axios.get(
				`${process.env.REACT_APP_API_DOMAIN}requiredFeatures/getAllForOneDistributorAndOnePage/${response.data.datas.receiverId}/identification`
			)

			setRequiredFeatures(response.data.datas)
		} catch (error) {
			setApiResponse(returnApiResponseError(error))
		}
	}

	return (
		<Controller
			control={control}
			name={'order'}
			rules={{ required: true }}
			render={({ field: { onChange, value } }) => (
				<Select
					options={orderOptions}
					onChange={(value) => {
						onChange(value)
						handleOrderChange(value.value)
					}}
					placeholder={'Sélectionner une commande'}
					className="text-center mt-3"
					value={value}
				/>
			)}
		/>
	)
}

export default OrderPart
