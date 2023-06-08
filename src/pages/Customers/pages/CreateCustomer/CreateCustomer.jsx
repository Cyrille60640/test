import { useForm } from 'react-hook-form'
import {
	Button,
	Div,
	Form,
	Separator,
	Title
} from '../../../../components/templates'
import { useNavigate } from 'react-router-dom'
import { createOneCustomer, uploadCustomerLogo } from '../../../../services'
import './CreateCustomer.scss'
import {
	BillingPart,
	IdentificationPart,
	IdentityPart,
	ProductsPart,
	StockPart
} from './components'
import { useState } from 'react'

const CreateCustomer = ({ datas }) => {
	// * Déclarations:
	const navigate = useNavigate(),
		{
			control,
			handleSubmit,
			setValue,
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
		[
			billindAndDeliveryAddressAreTheSame,
			setBillindAndDeliveryAddressAreTheSame
		] = useState(false),
		[checkParameters, setCheckParameters] = useState(false),
		onSubmit = (data) => {
			let { billing_address, delivery_address } = data,
				dataToSubmit = {
					...data,
					delivery_address: !billindAndDeliveryAddressAreTheSame
						? delivery_address
						: billing_address
				}
			createOneCustomer(dataToSubmit).then((id) => {
				uploadCustomerLogo(dataToSubmit, id)
			})
		}

	return (
		<Div className={'justify-align-center flex-column w-100 h-100'}>
			<Title children={'Ajouter un client'} />

			<Form
				id={'createCustomer'}
				className={'p-4 w-75 flex-column'}
				onSubmit={handleSubmit(onSubmit)}
				encType={'multipart/form-data'}
			>
				<IdentityPart
					control={control}
					setValue={setValue}
					errors={errors}
					datas={{ customersGroups, customersTypes }}
					billindAndDeliveryAddressAreTheSame={
						billindAndDeliveryAddressAreTheSame
					}
					setBillindAndDeliveryAddressAreTheSame={
						setBillindAndDeliveryAddressAreTheSame
					}
				/>

				<Separator />

				<BillingPart
					control={control}
					setValue={setValue}
					errors={errors}
					tvas={tvas}
				/>

				<Separator />

				<StockPart control={control} />

				<Separator />

				<ProductsPart
					control={control}
					errors={errors}
					datas={{ brands, qualities }}
					setCheckParameters={setCheckParameters}
				/>

				<Separator />

				<IdentificationPart
					control={control}
					setValue={setValue}
					checkParameters={checkParameters}
				/>

				<Div className={'justify-center mt-3'}>
					<Button label={'Retour'} onClick={() => navigate('/')} />
					<Button
						type={'submit'}
						className={'ms-3'}
						label={elementId === undefined ? 'Ajouter' : 'Modifier'}
					/>
				</Div>
			</Form>
		</Div>
	)
}

export default CreateCustomer
