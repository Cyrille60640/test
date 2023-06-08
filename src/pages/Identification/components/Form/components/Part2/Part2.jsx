import { Button, Div, Select } from '../../../../../../components/templates'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useState } from 'react'
import { BoxForm } from './components'

const Part2 = ({
	control,
	boxs,
	setValue,
	getValues,
	errors,
	setApiResponse,
	setPart
}) => {
	const [openBoxFormModal, setOpenBoxFormModal] = useState(false),
		handleValidation = () => {
			let values = getValues(),
				{ box } = values

			if (!box) {
				return setApiResponse({
					type: 'error',
					message: 'Sélectionnez un carton !'
				})
			}

			setPart(3)
		}

	return (
		<>
			<Div className={'h-50 justify-align-center flex-column'}>
				<Div className={'justify-align-center'}>
					<Select
						control={control}
						name={'box'}
						options={boxs.options}
						errors={errors}
						placeholder={'Sélectionner un carton'}
					/>
					<Button
						className={'align-center ms-2'}
						label={<AiOutlinePlusCircle />}
						onClick={() => setOpenBoxFormModal(true)}
					/>
				</Div>
				<Button
					className={'mt-2'}
					label={'Valider'}
					onClick={handleValidation}
				/>
			</Div>
			<BoxForm
				openBoxFormModal={openBoxFormModal}
				setOpenBoxFormModal={setOpenBoxFormModal}
				boxs={boxs}
				parentSetValue={setValue}
			/>
		</>
	)
}

export default Part2
