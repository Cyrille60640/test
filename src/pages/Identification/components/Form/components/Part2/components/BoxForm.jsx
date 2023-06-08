import {
	Button,
	Div,
	Input,
	Modal
} from '../../../../../../../components/templates'
import { useForm } from 'react-hook-form'
import { createBox } from '../../../../../../../services'

const BoxForm = ({
	openBoxFormModal,
	setOpenBoxFormModal,
	boxs,
	parentSetValue
}) => {
	const {
			control,
			handleSubmit,
			setValue,
			formState: { errors }
		} = useForm(),
		onSubmit = (data) => {
			data = {
				...data,
				stock: true,
				standby: true,
				id_item: 1,
				id_customer: 1,
				created_at: new Date()
			}
			createBox(data).then((boxId) => {
				setOpenBoxFormModal(false)
				setValue('ref', null)
				setValue('weight', null)
				// // refreshCustomersGroups(
				// //     customersGroups.refreshDate,
				// //     customersGroups
				// // )
				parentSetValue('box', {
					value: boxId,
					label: data.ref
				})
			})
		}

	return (
		<Modal
			open={openBoxFormModal}
			setOpen={setOpenBoxFormModal}
			content={{
				header: 'Créer un carton',
				body: (
					<Div className={'align-center flex-column'}>
						<Input
							className={'my-2'}
							control={control}
							name={'ref'}
							label={'Référence'}
						/>
						<Input
							className={'my-2'}
							control={control}
							name={'weight'}
							type={'number'}
							label={'Poids'}
							setValue={setValue}
						/>
					</Div>
				),
				footer: (
					<Div>
						<Button
							label={'Annuler'}
							onClick={() => setOpenBoxFormModal(false)}
						/>
						<Button
							label={'Valider'}
							onClick={handleSubmit(onSubmit)}
						/>
					</Div>
				)
			}}
		/>
	)
}

export default BoxForm
