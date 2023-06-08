import { useState } from 'react'
import {
	Button,
	Checkbox,
	Div,
	FileInput,
	Input,
	Select,
	SubTitle
} from '../../../../../../components/templates'
import { REGSTRING } from '../../../../../../utils/regex'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { CustomerGroupForm } from './components'

const IdentityPart = ({
	control,
	setValue,
	errors,
	datas,
	billindAndDeliveryAddressAreTheSame,
	setBillindAndDeliveryAddressAreTheSame
}) => {
	// * Déclarations:
	const { customersGroups, customersTypes } = datas,
		[openCustomerGroupModal, setOpenCustomerGroupModal] = useState(false)

	return (
		<>
			<SubTitle label={'Identité'} className={'text-center'} />

			<Div className={'justify-between my-2'}>
				<Input
					control={control}
					name={'social_reason'}
					className={'w-50'}
					label={'Raison sociale'}
					rules={{
						required:
							'Vous devez renseigner une raison sociale pour le distributeur.',
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message
						}
					}}
					errors={errors}
				/>

				<FileInput
					control={control}
					name={'logo'}
					label={'Ajouter un logo'}
				/>
			</Div>
			<Div className={'my-2 justify-between'}>
				<Select
					control={control}
					name={'customerType'}
					options={customersTypes.options}
					classNamePrefix={'w-49'}
					placeholder={'Sélectionner le type de client'}
					rules={{
						required: 'Vous devez indiquer le type de client.'
					}}
					errors={errors}
				/>

				<Div className={'d-flex'}>
					<Select
						control={control}
						name={'customerGroup'}
						options={customersGroups.options}
						classNamePrefix={'w-49'}
						placeholder={'Sélectionner le groupe de client'}
						rules={{
							required: 'Vous devez indiquer le groupe de client.'
						}}
						errors={errors}
					/>

					<Button
						className={'align-center ms-2'}
						label={<AiOutlinePlusCircle />}
						onClick={() => setOpenCustomerGroupModal(true)}
					/>
				</Div>
			</Div>
			<Div className={'justify-between align-center my-2'}>
				<Input
					control={control}
					name={'billing_address'}
					className={'w-49'}
					label={'Adresse de facturation'}
					rules={{
						required:
							'Vous devez renseigner une addresse de facturation pour le distributeur.',
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message
						}
					}}
					errors={errors}
				/>

				<Div className={'flex-column w-49'}>
					<Checkbox
						label={'Adresse de livraison identique ?'}
						onChange={() =>
							setBillindAndDeliveryAddressAreTheSame(
								!billindAndDeliveryAddressAreTheSame
							)
						}
					/>

					{!billindAndDeliveryAddressAreTheSame && (
						<Input
							control={control}
							name={'delivery_address'}
							label={'Adresse de livraison'}
							rules={{
								required:
									'Vous devez renseigner une addresse de livraison pour le distributeur.',
								pattern: {
									value: REGSTRING.value,
									message: REGSTRING.message
								}
							}}
							errors={errors}
						/>
					)}
				</Div>
			</Div>
			<CustomerGroupForm
				openCustomerGroupModal={openCustomerGroupModal}
				setOpenCustomerGroupModal={setOpenCustomerGroupModal}
				customersGroups={customersGroups}
				parentSetValue={setValue}
			/>
		</>
	)
}

export default IdentityPart
