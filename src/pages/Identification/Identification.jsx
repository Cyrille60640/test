// * Imports:
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Form, IdentificationModals } from './components'
import { BoxLabel, ProductLabel } from '../../components/multiparty'
import { createProduct } from '../../services'

const Identification = ({ datas, setApiResponse }) => {
	// * Déclarations:
	const [part, setPart] = useState(1),
		[order, setOrder] = useState({ requiredFeatures: {} }),
		[productDatas, setProductDatas] = useState(),
		[showUndefinedBrandModal, setShowUndefinedBrandModal] = useState(false),
		[showColorsModal, setShowColorsModal] = useState(false),
		[showPrintsModal, setShowPrintsModal] = useState(false),
		[showMaterialsModal1, setShowMaterialsModal1] = useState(false),
		[showMaterialsModal2, setShowMaterialsModal2] = useState(false),
		[showMaterialsModal3, setShowMaterialsModal3] = useState(false),
		[showConfirmationModal, setShowConfirmationModal] = useState(false),
		[numberOfAttributes, setNumberOfAttributes] = useState(0),
		[labelInfos, setLabelInfos] = useState(),
		[lastsLabelInfos, setLastsLabelInfos] = useState(),
		[boxLabelInfos, setBoxLabelInfos] = useState(),
		idsToDNone = ['doSortOrder', 'sidebar'],
		[showBoxModal, setShowBoxModal] = useState(false),
		{
			register,
			control,
			handleSubmit,
			setValue,
			getValues,
			watch,
			getFieldState,
			formState: { errors }
		} = useForm({
			mode: 'onBlur',
			reValidateMode: 'onBlur',
			shouldFocusError: true,
			defaultValues: {
				category: { value: 1, label: 'Femme' },
				season: { value: 1, label: 'Eté' },
				state: { value: 1, label: 'Etat neuf avec étiquette' },
				// type: { value: 1, label: 'Robes' },
				style: { value: 1, label: 'Actuel' },
				length: '50',
				width: '50'
			}
		})

	// * "Mise en cache" des labelInfos pour réimprimer l'étiquette:
	useEffect(() => {
		if (lastsLabelInfos) {
			setLabelInfos(lastsLabelInfos)
		}
	}, [lastsLabelInfos])

	// * Reset général après ajout ou manque de prix:
	const resetFields = () => {
		let { size, color, print, material, measures } = order.requiredFeatures

		if (size.visible) {
			setValue('size', '')
		}
		setValue('brand', '')
		if (color.visible) {
			setValue('color', '')
			document.querySelector('#currentValueColor').innerHTML = ''
		}
		if (print.visible) {
			setValue('print', '')
			document.querySelector('#currentValuePrint').innerHTML = ''
		}
		if (material.visible) {
			setValue('main_material', '')
			setValue('secondary_material', '')
			document
				.querySelector('#secondary_material_button')
				.classList.add('d-none')
			setValue('other_material', '')
			document
				.querySelector('#other_material_button')
				.classList.add('d-none')
			document.querySelector('#currentValueMaterial1').innerHTML = ''
			document.querySelector('#currentValueMaterial2').innerHTML = ''
			document.querySelector('#currentValueMaterial3').innerHTML = ''
		}
		if (measures.visible) {
			setValue('length', '')
			setValue('width', '')
			setValue('third_measure', '')
		}
		setValue('sapeeChoice', false)

		// Reset attributs:
		if (numberOfAttributes > 0 && document.querySelector('#attribute1')) {
			for (let i = 1; i <= numberOfAttributes; i++) {
				document.querySelector('#attribute' + i).value = ''
			}
		}

		// Reset classes:
		datas.classes.options.forEach((classOption) => {
			setValue('class-' + classOption.value, '')
		})
	}

	// * Gestion de la soumission:
	const onSubmit = async (data) => {
		// On bloque le bouton de validation pour éviter un double envoi des données:
		document.querySelector('#validationBtn').setAttribute('disabled', '')

		// Déclarations:
		let { id_main_product, price } = productDatas,
			{
				box,
				brand,
				category,
				color,
				length,
				main_material,
				other_material,
				print,
				sapee_choice,
				secondary_material,
				size,
				state,
				support,
				third_measure,
				type,
				width
			} = data,
			attributes = [],
			classes = []

		// Formatage des attributs:
		for (let i = 1; i <= numberOfAttributes; i++) {
			let select = document.querySelector('#attribute' + i),
				{ dataset, value } = select,
				id_attribute = parseInt(dataset.ref),
				id_sub_attribute = parseInt(value)
			if (id_sub_attribute) {
				attributes.push({ id_attribute, id_sub_attribute })
			}
		}

		// Formatage des classes:
		Object.keys(data).forEach((key) => {
			if (key.split('-')[0] === 'class' && data[key]) {
				classes.push(data[key])
			}
		})

		// Insertion du produit:
		createProduct({
			id_main_product,
			origin_price: price,
			price,
			id_brand: brand.value,
			id_color: color !== '' ? color : null,
			id_main_material: main_material !== '' ? main_material : null,
			id_secondary_material:
				secondary_material !== '' ? secondary_material : null,
			id_other_material: other_material !== '' ? other_material : null,
			id_print: print !== '' ? print : null,
			id_size: size ? size.value : null,
			length_in_cm: length !== '' ? length : null,
			width_in_cm: width !== '' ? width : null,
			third_measure_in_cm: third_measure !== '' ? third_measure : null,
			sapee_choice,
			id_order: order.id,
			id_box: box ? box.value : null,
			id_support: support ? support.value : null,
			attributes,
			classes
		}).then((resData) => {
			let { datas, status_code } = resData
			if (status_code === 201) {
				// Réinitialisation des différents selects:
				resetFields()

				// Récupération des infos produits pour l'étiquette:
				let { bar_code, ref } = datas,
					startDate = new Date()
				startDate = startDate.toISOString()
				setLastsLabelInfos({
					bar_code,
					typeName: type.label,
					categoryName: category.label,
					// sizeName: data.size.label,
					brandName: brand.label,
					// qualityName: data.quality.label,
					stateName: state.label,
					price,
					startDate,
					ref,
					priceAndEan13OnLabel: 1
				})
			}
		})
	}

	// * Gestion de l'après impression:
	const handleAfterPrint = () => {
		document.querySelector('#validationBtn').removeAttribute('disabled')
		setShowConfirmationModal(true)
		// Affichage du message de succès:
		setApiResponse({
			type: 'success',
			message: 'Produit ajouté !'
		})
	}

	return (
		<>
			<Form
				datas={datas}
				part={part}
				setPart={setPart}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				setApiResponse={setApiResponse}
				order={order}
				setOrder={setOrder}
				productDatas={productDatas}
				setProductDatas={setProductDatas}
				control={control}
				register={register}
				errors={errors}
				setValue={setValue}
				getValues={getValues}
				getFieldState={getFieldState}
				watch={watch}
				setShowUndefinedBrandModal={setShowUndefinedBrandModal}
				setShowColorsModal={setShowColorsModal}
				setShowPrintsModal={setShowPrintsModal}
				setShowMaterialsModal1={setShowMaterialsModal1}
				setShowMaterialsModal2={setShowMaterialsModal2}
				setShowMaterialsModal3={setShowMaterialsModal3}
				setNumberOfAttributes={setNumberOfAttributes}
				resetFields={resetFields}
				setShowBoxModal={setShowBoxModal}
			/>
			{/* Etiquettes */}
			<ProductLabel
				labelInfos={labelInfos}
				setLabelInfos={setLabelInfos}
				idsToDNone={idsToDNone}
				functionAfterPrint={handleAfterPrint}
			/>
			<BoxLabel
				labelInfos={boxLabelInfos}
				setLabelInfos={setBoxLabelInfos}
				idsToDNone={idsToDNone}
				functionAfterPrint={() =>
					setApiResponse({
						type: 'success',
						message: 'Carton conclut !'
					})
				}
			/>
			{/* Modals avec d-none Inputs */}
			<IdentificationModals
				datas={datas}
				order={order}
				register={register}
				control={control}
				errors={errors}
				setValue={setValue}
				getValues={getValues}
				setApiResponse={setApiResponse}
				showConfirmationModal={showConfirmationModal}
				setShowConfirmationModal={setShowConfirmationModal}
				setLabelInfos={setLabelInfos}
				lastsLabelInfos={lastsLabelInfos}
				showUndefinedBrandModal={showUndefinedBrandModal}
				setShowUndefinedBrandModal={setShowUndefinedBrandModal}
				showColorsModal={showColorsModal}
				setShowColorsModal={setShowColorsModal}
				showPrintsModal={showPrintsModal}
				setShowPrintsModal={setShowPrintsModal}
				showMaterialsModal1={showMaterialsModal1}
				setShowMaterialsModal1={setShowMaterialsModal1}
				showMaterialsModal2={showMaterialsModal2}
				setShowMaterialsModal2={setShowMaterialsModal2}
				showMaterialsModal3={showMaterialsModal3}
				setShowMaterialsModal3={setShowMaterialsModal3}
				showBoxModal={showBoxModal}
				setShowBoxModal={setShowBoxModal}
				setBoxLabelInfos={setBoxLabelInfos}
			/>
		</>
	)
}

export default Identification
