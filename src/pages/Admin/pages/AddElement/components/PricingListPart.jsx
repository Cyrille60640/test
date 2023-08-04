import { Controller } from 'react-hook-form'
import { Select } from '../../../../../components/templates'
import axios from 'axios'
import { useState, useEffect } from 'react'

const PricingListPart = ({
	control,
	register,
	errors,
	setValue,
	setApiResponse
}) => {
	// Récupération des distributeurs et des tvas:
	const [receiverOptions, setReceiverOptions] = useState([])
	const [tvaOptions, setTvaOptions] = useState([])
	useEffect(() => {
		axios.get(process.env.REACT_APP_API_DOMAIN + 'receiver').then((res) => {
			let receiversToState = []
			res.data.datas.forEach((receiver) => {
				receiversToState.push({
					value: receiver.id,
					label: receiver.name
				})
			})
			setReceiverOptions(receiversToState)
		})

		axios.get(process.env.REACT_APP_API_DOMAIN + 'tva').then((res) => {
			let tvasToState = []
			res.data.datas.forEach((tva) => {
				tvasToState.push({
					value: tva.id,
					label: tva.name
				})
			})
			setTvaOptions(tvasToState)
		})
	}, [])

	const handleChangeReceiver = (value) => {
		axios
			.get(
				`${process.env.REACT_APP_API_DOMAIN}receiver/getTvaForAReceiver/${value}`
			)
			.then((res) => {
				let { id, name } = res.data.datas
				setValue('tva', { value: id, label: name })
			})
	}

	return (
		<>
			<div className="justify-around">
				<label htmlFor="start_date">
					Date de début:
					<input
						className="form-control"
						id="start_date"
						type="date"
						{...register('start_date', {
							required: true
						})}
					/>
				</label>

				<label htmlFor="end_date">
					Date de fin:
					<input
						className="form-control"
						id="end_date"
						type="date"
						{...register('end_date')}
					/>
				</label>
			</div>

			<Controller
				// key={'test'}
				control={control}
				name={'distributor'}
				rules={{
					required: 'Vous devez indiquer le distributeur.'
				}}
				render={({ field: { onChange, onBlur, value, ref } }) => (
					<Select
						name={'distributor'}
						options={receiverOptions}
						onChange={(value) => {
							onChange(value)
							handleChangeReceiver(value.value)
						}}
						placeholder={'Sélectionner le distributeur'}
						className="text-center my-3"
						value={value}
					/>
				)}
			/>
			{errors.receiver && (
				<span className="invalid-feedback text-center">
					{errors.receiver.message}
				</span>
			)}

			<Controller
				// key={'test'}
				control={control}
				name={'tva'}
				rules={{
					required: 'Vous devez indiquer la tva.'
				}}
				render={({ field: { onChange, onBlur, value, ref } }) => (
					<Select
						name={'tva'}
						options={tvaOptions}
						onChange={onChange}
						placeholder={'Sélectionner la Tva'}
						className="text-center my-3"
						value={value}
					/>
				)}
			/>
			{errors.tva && (
				<span className="invalid-feedback text-center">
					{errors.tva.message}
				</span>
			)}
		</>
	)
}

export default PricingListPart
