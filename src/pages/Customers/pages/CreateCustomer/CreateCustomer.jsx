import { useForm } from 'react-hook-form'
import { Div, Form, Title } from '../../../../components/templates'
import { useNavigate } from 'react-router-dom'
import { createOneCustomer, uploadCustomerLogo } from '../../../../services'
import './CreateCustomer.scss'
import { BoxProcessPart, MainPart } from './components'
import { useState } from 'react'

const CreateCustomer = ({ datas }) => {
	// * Déclarations:
	const navigate = useNavigate(),
		{
			control,
			setValue,
			getValues,
			formState: { errors }
		} = useForm({
			defaultValues: {
				social_reason: 'Leclerc',
				billing_address: "441 rue d'abbeville",
				delivery_address: "441 rue d'abbeville",
				accounting_code: '8945R',
				per_commission: '45.56',
				customerType: { value: 1, label: 'TEST' },
				customerGroup: { value: 1, label: 'TESTA' },
				qualities: { value: 1, label: 'Premium' },
				tvaType: { value: 1, label: '20%' }
			}
		}),
		{ brands, customersGroups, customersTypes, qualities, tvas } = datas,
		elementId = undefined,
		[part, setPart] = useState(1),
		[
			billindAndDeliveryAddressAreTheSame,
			setBillindAndDeliveryAddressAreTheSame
		] = useState(false),
		[boxProcessMode, setBoxProcessMode] = useState(false),
		handleSubmit = () => {
			let data = getValues(),
				{ billing_address, delivery_address } = data,
				dataToSubmit = {
					...data,
					delivery_address: !billindAndDeliveryAddressAreTheSame
						? delivery_address
						: billing_address
				}
			createOneCustomer(dataToSubmit).then((id) => {
				uploadCustomerLogo(dataToSubmit, id)
			})
		},
		handleEndingPart1 = () => {
			if (!boxProcessMode) {
				handleSubmit()
			} else {
				setPart(2)
			}
		}

	return (
		<Div className={'justify-align-center flex-column w-100 h-100'}>
			<Title children={'Ajouter un client'} />

			<Form
				id={'createCustomer'}
				className={'p-4 w-75 flex-column'}
				encType={'multipart/form-data'}
			>
				{part === 1 ? (
					<MainPart
						control={control}
						setValue={setValue}
						errors={errors}
						customersGroups={customersGroups}
						customersTypes={customersTypes}
						billindAndDeliveryAddressAreTheSame={
							billindAndDeliveryAddressAreTheSame
						}
						setBillindAndDeliveryAddressAreTheSame={
							setBillindAndDeliveryAddressAreTheSame
						}
						tvas={tvas}
						brands={brands}
						qualities={qualities}
						boxProcessMode={boxProcessMode}
						setBoxProcessMode={setBoxProcessMode}
						navigate={navigate}
						handleEndingPart1={handleEndingPart1}
						elementId={elementId}
					/>
				) : (
					<BoxProcessPart
						datas={datas}
						control={control}
						setValue={setValue}
						getValues={getValues}
						errors={errors}
					/>
				)}
			</Form>
		</Div>
	)
}

export default CreateCustomer
