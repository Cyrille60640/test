// import { useParams, useNavigate, useLocation } from 'react-router-dom'
// import { useForm } from 'react-hook-form'
// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import {
// 	asyncForEach,
// 	returnApiResponseError
// } from '../../../../util/functions'
// import {
// 	ApiResponse,
// 	Loader,
// 	ProductLabel
// } from '../../../../components/multiparty'
// import { Form, Header } from './components'
// import './UpdateProduct.scss'

const UpdateProduct = ({ datas }) => {
	// * Récupération des props:
	const {
		classes,
		brands,
		colors,
		materials,
		prints,
		sizes,
		types,
		categories,
		seasons,
		states
	} = datas

	console.log(datas)
	// // * Déclarations:
	// const [apiResponse, setApiResponse] = useState(),
	// 	{ state: locationState } = useLocation(),
	// 	navigate = useNavigate(),
	// 	productId = useParams().id,
	// 	[product, setProduct] = useState(),
	// 	[provisoireColors, setProvisoireColors] = useState(),
	// 	[attributes, setAttributes] = useState([]),
	// 	[requiredFeatures, setRequiredFeatures] = useState({}),
	// 	[datasLoaded, setDatasLoaded] = useState(false),
	// 	[labelInfos, setLabelInfos] = useState(),
	// 	idsToDNone = ['updateProduct']
	// // * Récupération du produit:
	// useEffect(() => {
	// 	axios
	// 		.get(`${process.env.REACT_APP_API_DOMAIN}product/${productId}`)
	// 		.then((res) => {
	// 			setProduct(res.data.datas)
	// 		})
	// 		.catch((err) => {
	// 			setApiResponse(returnApiResponseError(err))
	// 		})
	// }, [])
	// // ? PROVISOIRE: Mise à jour du format des couleurs:
	// useEffect(() => {
	// 	if (colorOptions.length > 1) {
	// 		let newOptions = []
	// 		colorOptions.forEach((option) => {
	// 			newOptions.push({
	// 				value: option.id,
	// 				label: option.name
	// 			})
	// 		})
	// 		setProvisoireColors(newOptions)
	// 	}
	// }, [colorOptions])
	// // * Déclaration hook form:
	// const {
	// 	register,
	// 	handleSubmit,
	// 	setValue,
	// 	getValues,
	// 	control,
	// 	formState: { errors }
	// } = useForm({
	// 	mode: 'onBlur',
	// 	reValidateMode: 'onBlur',
	// 	shouldFocusError: true
	// })
	// // * Fonction pour récupérer les attributs et sous-attributs:
	// const getAttributes = async (productId) => {
	// 	try {
	// 		// Récupération des liens:
	// 		let response = await axios.get(
	// 			`${process.env.REACT_APP_API_DOMAIN}productAttributeSubAttribute/getAttributesAndSubAttributesForAProduct/${productId}`
	// 		)
	// 		// Récupération des sous attributs pour les selects:
	// 		let attributesToState = []
	// 		await asyncForEach(response.data.datas, async (link) => {
	// 			await axios.get(
	// 				`${process.env.REACT_APP_API_DOMAIN}subAttribute/getSubAttributesForAnAttribute/${link.id_attribute}`
	// 			)
	// 			attributesToState.push({
	// 				placeholder: link.name
	// 			})
	// 		})
	// 		setAttributes(attributesToState)
	// 	} catch (error) {
	// 		setApiResponse(returnApiResponseError(error))
	// 	}
	// }
	// // console.log(attributes)
	// // * Fonction de récupération des requiredFeatures:
	// const getRequiredFeatures = async (orderId) => {
	// 	try {
	// 		let response = await axios.get(
	// 			`${process.env.REACT_APP_API_DOMAIN}order/${orderId}`
	// 		)
	// 		response = await axios.get(
	// 			`${process.env.REACT_APP_API_DOMAIN}requiredFeatures/getAllForOneDistributorAndOnePage/${response.data.datas.receiverId}/identification`
	// 		)
	// 		setRequiredFeatures(response.data.datas)
	// 	} catch (error) {
	// 		setApiResponse(returnApiResponseError(error))
	// 	}
	// }
	// // * Fonction d'appui pour le setValue:
	// const getLabelWithValue = (propertyOptions, value) => {
	// 	for (let i = 0; i < propertyOptions.length; i++) {
	// 		if (value === propertyOptions[i].value) {
	// 			return propertyOptions[i].label
	// 		}
	// 	}
	// }
	// // * On met à jour les valeurs des selects quand les props sont chargés:
	// useEffect(() => {
	// 	if (
	// 		product &&
	// 		classOptions &&
	// 		brandOptions &&
	// 		colorOptions &&
	// 		materialOptions &&
	// 		printOptions &&
	// 		sizeOptions &&
	// 		typeOptions &&
	// 		categoryOptions &&
	// 		subCategoryOptions &&
	// 		seasonOptions &&
	// 		stateOptions &&
	// 		provisoireColors &&
	// 		!datasLoaded
	// 	) {
	// 		// Retrait du Loader:
	// 		setDatasLoaded(true)
	// 		// Mise à jour des selects:
	// 		let {
	// 			categoryId,
	// 			subCategoryId,
	// 			typeId,
	// 			stateId,
	// 			description,
	// 			brandId,
	// 			colorId,
	// 			seasonId,
	// 			mainMaterialId,
	// 			secondaryMaterialId,
	// 			otherMaterialId,
	// 			printId,
	// 			sizeId,
	// 			length_in_cm,
	// 			width_in_cm,
	// 			third_measure_in_cm,
	// 			classicOrRetro,
	// 			origin_price,
	// 			price,
	// 			orderId,
	// 			orderRef,
	// 			sapee_choice,
	// 			class: classes
	// 		} = product
	// 		// console.log(product)
	// 		getAttributes(product.id)
	// 		setValue('category', {
	// 			value: categoryId,
	// 			label: getLabelWithValue(categoryOptions, categoryId)
	// 		})
	// 		if (categoryId === 3) {
	// 			setValue('subCategory', {
	// 				value: subCategoryId,
	// 				label: getLabelWithValue(subCategoryOptions, subCategoryId)
	// 			})
	// 		}
	// 		setValue('type', {
	// 			value: typeId,
	// 			label: getLabelWithValue(typeOptions, typeId)
	// 		})
	// 		setValue('state', {
	// 			value: stateId,
	// 			label: getLabelWithValue(stateOptions, stateId)
	// 		})
	// 		setValue('description', description)
	// 		setValue('brand', {
	// 			value: brandId,
	// 			label: getLabelWithValue(brandOptions, brandId)
	// 		})
	// 		if (colorId !== null) {
	// 			setValue('color', {
	// 				value: colorId,
	// 				label: getLabelWithValue(provisoireColors, colorId)
	// 			})
	// 		}
	// 		setValue('season', {
	// 			value: seasonId,
	// 			label: getLabelWithValue(seasonOptions, seasonId)
	// 		})
	// 		if (mainMaterialId !== undefined) {
	// 			setValue('mainMaterial', {
	// 				value: mainMaterialId,
	// 				label: getLabelWithValue(materialOptions, mainMaterialId)
	// 			})
	// 		}
	// 		if (secondaryMaterialId !== undefined) {
	// 			setValue('secondaryMaterial', {
	// 				value: secondaryMaterialId,
	// 				label: getLabelWithValue(
	// 					materialOptions,
	// 					secondaryMaterialId
	// 				)
	// 			})
	// 		}
	// 		if (otherMaterialId !== undefined) {
	// 			setValue('otherMaterial', {
	// 				value: otherMaterialId,
	// 				label: getLabelWithValue(materialOptions, otherMaterialId)
	// 			})
	// 		}
	// 		if (printId !== null) {
	// 			setValue('print', {
	// 				value: printId,
	// 				label: getLabelWithValue(printOptions, printId)
	// 			})
	// 		}
	// 		if (sizeId !== null) {
	// 			setValue('size', {
	// 				value: sizeId,
	// 				label: getLabelWithValue(sizeOptions, sizeId)
	// 			})
	// 		}
	// 		setValue('length', length_in_cm)
	// 		setValue('width', width_in_cm)
	// 		setValue('third_measure', third_measure_in_cm)
	// 		setValue(
	// 			'classicOrRetro',
	// 			classicOrRetro === 'Classique' ? '0' : '1'
	// 		)
	// 		setValue('sapeeChoice', sapee_choice)
	// 		setValue('originPrice', origin_price)
	// 		setValue('price', price)
	// 		setValue('order', { value: orderId, label: orderRef })
	// 		// Gestion des classes:
	// 		if (classes !== undefined) {
	// 			classes.forEach((item) => {
	// 				setValue('class-' + item, true)
	// 			})
	// 		}
	// 		// Récupération des règles de saisies selon le distributeur:
	// 		getRequiredFeatures(orderId)
	// 	}
	// }, [product, props, provisoireColors])
	// // * Déclaration du state pour réappeller la fonction getValues qui permettra de d'afficher certains selects ou non:
	// const [refreshGetValues, setRefreshGetValues] = useState(false)
	// useEffect(() => {
	// 	if (refreshGetValues) {
	// 		setRefreshGetValues(false)
	// 	}
	// }, [refreshGetValues])
	// // * Soumission:
	// const onSubmit = async (data) => {
	// 	// Destructuration des datas:
	// 	let {
	// 		category,
	// 		subCategory,
	// 		type,
	// 		brand,
	// 		state,
	// 		season,
	// 		classicOrRetro,
	// 		description,
	// 		color,
	// 		mainMaterial,
	// 		secondaryMaterial,
	// 		otherMaterial,
	// 		print,
	// 		size,
	// 		length,
	// 		width,
	// 		third_measure,
	// 		order,
	// 		sapeeChoice,
	// 		originPrice,
	// 		price
	// 	} = data
	// 	try {
	// 		let response
	// 		// Récupération de la qualité de la marque:
	// 		response = await axios.get(
	// 			`${process.env.REACT_APP_API_DOMAIN}brand/${brand.value}`
	// 		)
	// 		let qualityId = response.data.datas.id_quality
	// 		// Récupération du mainProduct:
	// 		response = await axios.get(
	// 			`${process.env.REACT_APP_API_DOMAIN}mainProduct/getIdForOne/${
	// 				category.value
	// 			}/${subCategory !== undefined ? subCategory.value : null}/${
	// 				type.value
	// 			}/${qualityId}/${state.value}/${season.value}/${classicOrRetro}`
	// 		)
	// 		let mainProductId = response.data.datas
	// 		// Mise à jour du produit:
	// 		let priceToPut =
	// 			originPrice === product.origin_price ? price : originPrice
	// 		response = await axios.put(
	// 			`${process.env.REACT_APP_API_DOMAIN}product/${productId}`,
	// 			{
	// 				id_main_product: mainProductId,
	// 				description,
	// 				id_brand: brand.value,
	// 				id_color: color ? color.value : null,
	// 				id_main_material: mainMaterial ? mainMaterial.value : null,
	// 				id_secondary_material: secondaryMaterial
	// 					? secondaryMaterial.value
	// 					: null,
	// 				id_other_material: otherMaterial
	// 					? otherMaterial.value
	// 					: null,
	// 				id_print: print ? print.value : null,
	// 				id_size: size ? size.value : null,
	// 				length_in_cm: length,
	// 				width_in_cm: width,
	// 				third_measure_in_cm: third_measure,
	// 				id_order: order.value,
	// 				sapee_choice: sapeeChoice,
	// 				origin_price: originPrice,
	// 				price: priceToPut
	// 			}
	// 		)
	// 		// Implantation des classes:
	// 		let classes = []
	// 		Object.keys(data).forEach((key) => {
	// 			if (key.split('-')[0] === 'class' && data[key]) {
	// 				classes.push(key.split('-')[1])
	// 			}
	// 		})
	// 		await axios.put(
	// 			`${process.env.REACT_APP_API_DOMAIN}productClass/updateOneProduct/${productId}`,
	// 			{ classes }
	// 		)
	// 		// Réimpression de l'étiquette si besoin:
	// 		if (response.data.datas.needToReprintLabel) {
	// 			axios
	// 				.get(
	// 					`${process.env.REACT_APP_API_DOMAIN}product/getByRefForLabel/byId/${productId}`
	// 				)
	// 				.then((res) => {
	// 					setLabelInfos(res.data.datas)
	// 				})
	// 		} else {
	// 			// Redirection différente si on vient d'une page différente de Products:
	// 			if (!locationState) {
	// 				// Redirection:
	// 				setApiResponse({
	// 					type: 'success',
	// 					message: response.data.message
	// 				})
	// 				// Redirection sur la page des produits:
	// 				setTimeout(() => {
	// 					window.location.assign('/products')
	// 				}, 1500)
	// 			} else {
	// 				// Redirection autre page:
	// 				switch (locationState.from) {
	// 					case '/validProducts':
	// 						navigate('/validProducts', {
	// 							state: {
	// 								validProductsValues:
	// 									locationState.validProductsValues,
	// 								productUpdated: {
	// 									id: productId,
	// 									newPrice: priceToPut
	// 								}
	// 							}
	// 						})
	// 						break
	// 					case '/searchProduct':
	// 						navigate('/searchProduct', {
	// 							state: { productRef: product.ref }
	// 						})
	// 						break
	// 					default:
	// 						navigate(locationState.from)
	// 				}
	// 			}
	// 		}
	// 	} catch (error) {
	// 		setApiResponse(returnApiResponseError(error))
	// 	}
	// }
	// // * Fonction pour l'après impression:
	// const redirectAfterLabelPrint = () => {
	// 	// Redirection différente si on vient d'une page différente de Products:
	// 	if (!locationState) {
	// 		// Redirection:
	// 		setApiResponse({
	// 			type: 'success',
	// 			message: 'Produit modifié !'
	// 		})
	// 		// Redirection sur la page des produits:
	// 		setTimeout(() => {
	// 			window.location.assign('/products')
	// 		}, 1000)
	// 	} else {
	// 		// Redirection autre page:
	// 		switch (locationState.from) {
	// 			case '/validProducts':
	// 				navigate('/validProducts', {
	// 					state: {
	// 						validProductsValues:
	// 							locationState.validProductsValues,
	// 						productUpdated: {
	// 							id: productId,
	// 							newPrice: labelInfos.price
	// 						}
	// 					}
	// 				})
	// 				break
	// 			case '/searchProduct':
	// 				navigate('/searchProduct', {
	// 					state: { productRef: product.ref }
	// 				})
	// 				break
	// 			default:
	// 				navigate(locationState.from)
	// 		}
	// 	}
	// }
	// return (
	// 	<>
	// 		{datasLoaded ? (
	// 			<div
	// 				id="updateProduct"
	// 				className="justify-align-center flex-column py-2"
	// 			>
	// 				<Header product={product} />
	// 				<Form
	// 					setApiResponse={setApiResponse}
	// 					handleSubmit={handleSubmit}
	// 					onSubmit={onSubmit}
	// 					control={control}
	// 					register={register}
	// 					errors={errors}
	// 					setValue={setValue}
	// 					getValues={getValues}
	// 					requiredFeatures={requiredFeatures}
	// 					setRequiredFeatures={setRequiredFeatures}
	// 					categoryOptions={categoryOptions}
	// 					refreshGetValues={refreshGetValues}
	// 					setRefreshGetValues={setRefreshGetValues}
	// 					subCategoryOptions={subCategoryOptions}
	// 					typeOptions={typeOptions}
	// 					stateOptions={stateOptions}
	// 					brandOptions={brandOptions}
	// 					provisoireColors={provisoireColors}
	// 					seasonOptions={seasonOptions}
	// 					materialOptions={materialOptions}
	// 					printOptions={printOptions}
	// 					sizeOptions={sizeOptions}
	// 					classOptions={classOptions}
	// 					locationState={locationState}
	// 					productRef={product.ref}
	// 				/>
	// 			</div>
	// 		) : (
	// 			<Loader />
	// 		)}
	// 		<ApiResponse apiResponse={apiResponse} />
	// 		<ProductLabel
	// 			labelInfos={labelInfos}
	// 			setLabelInfos={setLabelInfos}
	// 			idsToDNone={idsToDNone}
	// 			functionAfterPrint={redirectAfterLabelPrint}
	// 		/>
	// 	</>
	// )

	return 'YOLO'
}

export default UpdateProduct
