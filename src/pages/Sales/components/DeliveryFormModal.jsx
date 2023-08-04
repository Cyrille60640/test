import { Modal } from '../../../components/templates'
import axios from 'axios'
import { Button, Div, Form, Select } from '../../../components/templates'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

const DeliveryFormModal = ({
	openDeliveryFormOrderModal,
	setOpenDeliveryFormOrderModal,
	selectedDeliveryFormOrderId
}) => {
	const [boxesOptions, setBoxesOptions] = useState([]),
		{
			control,
			handleSubmit,
			setValue,
			getValues,
			formState: { errors }
		} = useForm({
			mode: 'onChange',
			reValidateMode: 'onChange',
			shouldFocusError: true
		}),
		checkGlobalSelection = (value) => {
			if (value.length > 1) {
				let globalValue = JSON.stringify({ value: 0, label: 'Global' })
				if (JSON.stringify(value[value.length - 1]) === globalValue) {
					setValue('selectedBoxes', [{ value: 0, label: 'Global' }])
				} else if (JSON.stringify(value[0]) === globalValue) {
					setValue('selectedBoxes', [value[1]])
				}
			}
		},
		getDeliveryFormExcel = () => {
			let { selectedBoxes } = getValues()
			// window.cursor = 'progress'
			axios
				.post(
					`${process.env.REACT_APP_API_DOMAIN}sale/getDeliveryFormExcel`,
					{
						saleId: selectedDeliveryFormOrderId,
						selectedBoxes:
							JSON.stringify(selectedBoxes) !==
							JSON.stringify([{ value: 0, label: 'Global' }])
								? selectedBoxes
								: 'global',
						step: 'creation'
					}
				)
				.then((res) => {
					if (res.data.status_code !== 204) {
						setTimeout(() => {
							document.querySelector('#dNoneLink').click()
							window.cursor = 'auto'
							// setApiResponse({
							// 	type: 'success',
							// 	message: res.data.message
							// })

							setTimeout(() => {
								axios.post(
									`${process.env.REACT_APP_API_DOMAIN}sale/getDeliveryFormExcel`,
									{ step: 'deletion' }
								)
							}, 500)
						}, 500)
					}
				})
		}

	useEffect(() => {
		if (selectedDeliveryFormOrderId) {
			axios
				.get(
					`${process.env.REACT_APP_API_DOMAIN}sale/getAllBoxesForASale/${selectedDeliveryFormOrderId}`
				)
				.then((res) => {
					let boxesOptionsToState = [{ value: 0, label: 'Global' }]
					res.data.datas.forEach((data) => {
						let { id, ref } = data
						boxesOptionsToState.push({ value: id, label: ref })
					})
					setBoxesOptions(boxesOptionsToState)
				})
		}
	}, [selectedDeliveryFormOrderId])

	return (
		<>
			<Modal
				open={openDeliveryFormOrderModal}
				setOpen={setOpenDeliveryFormOrderModal}
				content={{
					header: 'Sélection:',
					body: (
						<Form>
							<Select
								control={control}
								name={'selectedBoxes'}
								options={boxesOptions}
								placeholder={
									'Sélectionner une ou plusieurs boxs'
								}
								errors={errors}
								isMulti
								additionnalOnChange={(value) => {
									checkGlobalSelection(value)
								}}
							/>
						</Form>
					),
					footer: (
						<Div>
							<Button
								label={'Valider'}
								onClick={getDeliveryFormExcel}
							/>
						</Div>
					)
				}}
			/>
			<a
				id="dNoneLink"
				className="d-none"
				href={`${process.env.REACT_APP_API_DOMAIN}temp/bl.xlsx`}
				download
			></a>
		</>
	)
}

export default DeliveryFormModal
