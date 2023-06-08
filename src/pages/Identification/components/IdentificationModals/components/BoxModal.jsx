import {
	Button,
	Div,
	Input,
	Modal,
	Paragraph
} from '../../../../../components/templates'
import { useEffect, useState } from 'react'
import { concludeBox, getAllProducts } from '../../../../../services'

const BoxModal = ({
	showBoxModal,
	setShowBoxModal,
	setBoxLabelInfos,
	control,
	setValue,
	getValues,
	errors
}) => {
	// * Fonctions de conclusion du carton:
	const [validBtnDisabled, setValidBtnDisabled] = useState(true),
		[productsCount, setProductsCount] = useState(0),
		checkAllFields = async () => {
			let { weight } = await getValues()
			setTimeout(() => {
				setValidBtnDisabled(weight === '')
			}, 100)
		},
		getProductsCount = (value) => {
			getAllProducts('forOneSupport', value).then((data) => {
				console.log(data)
			})
			// getAllProducts('forOneSupport', value).then((data) => {
			// 	setProductsCount(data.datas.length)
			// })
		},
		handleConcludeBox = async () => {
			concludeBox({
				...getValues(),
				productsCount
			}).then((data) => {
				let { datas } = data
				setValue('distributor', null)
				setValue('weight', '')
				setShowBoxModal(false)
				setBoxLabelInfos(datas)
			})
		},
		{ box } = getValues()

	useEffect(() => {
		if (showBoxModal) {
			getProductsCount()
		}
	}, [showBoxModal])

	// * Structure de la modale:
	const header = 'Terminer un carton',
		body = (
			<Div>
				<Paragraph children={`Référence: ${box && box.label}`} />
				<Div className={'d-flex'}>
					<Paragraph
						className={'w-50 justify-align-center mb-0'}
						children={`Nombre de produits: ${productsCount}`}
					/>
					<Input
						control={control}
						name={'weight'}
						className={'w-25 text-center ms-3 me-2'}
						type={'number'}
						label={'Poids'}
						rules={{
							required:
								'Vous devez renseigner le poids du carton.'
						}}
						errors={errors}
						setValue={setValue}
						additionnalOnChange={checkAllFields}
					/>
					kg
				</Div>
			</Div>
		),
		footer = (
			<Button
				label={'Valider'}
				onClick={handleConcludeBox}
				disabled={validBtnDisabled}
			/>
		),
		content = { header, body, footer }

	return (
		<Modal
			id={'sellsModal'}
			open={showBoxModal}
			setOpen={setShowBoxModal}
			content={content}
			size={'lg'}
		/>
	)
}

export default BoxModal
