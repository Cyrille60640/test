import { useForm } from 'react-hook-form'
import {
	Button,
	Form,
	Input,
	Modal
} from '../../../../../../../../../components/templates'
import { REGSTRING } from '../../../../../../../../../utils/regex'
import '../../../../../CreateCustomer.scss'
import {
	createCustomerGroup,
	refreshCustomersGroups
} from '../../../../../../../../../services'

const CustomerGroupForm = ({
	openCustomerGroupModal,
	setOpenCustomerGroupModal,
	customersGroups,
	parentSetValue
}) => {
	// * Déclarations:
	const {
			control,
			handleSubmit,
			setValue,
			formState: { errors }
		} = useForm(),
		onSubmit = (data) => {
			createCustomerGroup(data).then((customerGroupId) => {
				setOpenCustomerGroupModal(false)
				setValue('name', null)
				refreshCustomersGroups(
					customersGroups.refreshDate,
					customersGroups
				)
				parentSetValue('customerGroup', {
					value: customerGroupId,
					label: data.name
				})
			})
		}

	return (
		<Modal
			open={openCustomerGroupModal}
			setOpen={setOpenCustomerGroupModal}
			content={{
				header: 'Ajouter un groupe de distributeur',
				body: (
					<Form className={'justify-center mt-2'}>
						<Input
							control={control}
							name={'name'}
							label={'Nom du groupe'}
							rules={{
								required:
									'Vous devez renseigner une raison sociale pour le distributeur.',
								pattern: {
									value: REGSTRING.value,
									message: REGSTRING.message
								}
							}}
							errors={errors}
							// !
							// autoFocus
						/>
					</Form>
				),
				footer: (
					<>
						<Button
							label={'Annuler'}
							onClick={() => setOpenCustomerGroupModal(false)}
						/>
						<Button
							label={'Ajouter'}
							onClick={handleSubmit(onSubmit)}
						/>
					</>
				)
			}}
		/>
	)
}

export default CustomerGroupForm
