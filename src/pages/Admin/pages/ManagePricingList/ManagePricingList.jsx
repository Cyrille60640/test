import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ApiResponse } from '../../../../components/multiparty'
import axios from 'axios'
import { returnApiResponseError } from '../../../../util/functions'

// Components imports:
import { Header, Import, PriceForm, PricingTable, Selects } from './components'

const ManagePricingList = ({
	categoryOptions,
	subCategoryOptions,
	typeOptions,
	qualityOptions,
	stateOptions,
	seasonOptions
}) => {
	// Déclaration de la réponse API:
	const [apiResponse, setApiResponse] = useState()

	// Récupération de l'identifiant de la liste de prix:
	const pricingListId = useParams().pricingListId

	// Récupération du pricing:
	const [pricing, setPricing] = useState([])
	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_API_DOMAIN}pricing/getAllForAPricingList/${pricingListId}`
			)
			.then((res) => {
				setPricing(res.data.datas)
			})
			.catch((error) => {
				setApiResponse(returnApiResponseError(error))
			})
	}, [])

	// Déclaration hook form:
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		control,
		formState: { errors }
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		shouldFocusError: true
	})

	// Déclaration des selects à maper:
	let selectsToShow = [
		{ name: 'season', options: seasonOptions, placeholder: 'Saison' },
		{
			name: 'actualOrVintage',
			options: [
				{ value: 0, label: 'Actuel' },
				{ value: 1, label: 'Vintage' }
			],
			placeholder: 'Actuel ou Vintage'
		},
		{
			name: 'category',
			options: categoryOptions,
			placeholder: 'Catégorie'
		},
		{
			name: 'subCategory',
			options: subCategoryOptions,
			placeholder: 'Sous-catégorie'
		},
		{ name: 'type', options: typeOptions, placeholder: 'Type' },
		{ name: 'state', options: stateOptions, placeholder: 'Etat' },
		{
			name: 'quality',
			options: qualityOptions,
			placeholder: 'Qualité de marque'
		}
	]

	// Récupération du mainProductId:
	const [mainProductId, setMainProductId] = useState()
	const [itsAnUpdate, setItsAnUpdate] = useState()
	const handleChange = async () => {
		let {
			category,
			subCategory,
			type,
			quality,
			state,
			season,
			actualOrVintage
		} = getValues()

		// Gestion du changement de catégorie:
		if (category && category.value !== 3) {
			setValue('subCategory', '')
		}

		// Execution:
		if (
			category &&
			(category.value !== 3 || subCategory) &&
			type &&
			quality &&
			state &&
			season &&
			actualOrVintage
		) {
			setApiResponse()

			try {
				let response = await axios.get(
					`${
						process.env.REACT_APP_API_DOMAIN
					}mainProduct/getIdForOne/${category.value}/${
						subCategory !== '' ? subCategory.value : 'null'
					}/${type.value}/${quality.value}/${state.value}/${
						season.value
					}/${actualOrVintage.value}`
				)

				setMainProductId(response.data.datas)

				// On check si ce mainProduct et cette liste de prix on déjà une valeur:
				response = await axios.get(
					`${process.env.REACT_APP_API_DOMAIN}pricing/getPriceForOneLink/${pricingListId}/${response.data.datas}`
				)

				if (response.status === 200) {
					setValue('price', response.data.datas.pa_ht)
					setItsAnUpdate(response.data.datas.id)
				} else {
					setValue('price', 0)
					setItsAnUpdate()
				}
			} catch (error) {
				setApiResponse(returnApiResponseError(error))
			}
		} else {
			setMainProductId()
		}
	}

	const [pricingChanged, setPricingChanged] = useState(false)
	const onSubmit = async (data) => {
		let {
			category,
			subCategory,
			type,
			quality,
			state,
			season,
			actualOrVintage
		} = data
		if (
			category &&
			(category.value !== 3 || subCategory) &&
			type &&
			quality &&
			state &&
			season &&
			actualOrVintage
		) {
			try {
				let response
				if (!itsAnUpdate) {
					response = await axios.post(
						process.env.REACT_APP_API_DOMAIN + 'pricing',
						{
							id_pricing_list: pricingListId,
							id_main_product: mainProductId,
							pa_ht: data.price,
							pvc_ht: parseInt(data.price) * 1.2
						}
					)
					setItsAnUpdate(response.data.datas)
				} else {
					response = await axios.put(
						`${process.env.REACT_APP_API_DOMAIN}pricing/${itsAnUpdate}`,
						{
							pa_ht: data.price,
							pvc_ht: parseInt(data.price) * 1.2
						}
					)
				}
				setPricingChanged(true)
				setApiResponse({
					type: 'success',
					message: response.data.message
				})
			} catch (error) {
				setApiResponse(returnApiResponseError(error))
			}
		} else {
			setApiResponse({
				type: 'error',
				message: 'Paramêtres manquants !'
			})
		}
	}

	// useEffect(() => {
	// 	if (pricingChanged) {
	// 		let pricingToState = pricing
	// 		let {
	// 			season,
	// 			actualOrVintage,
	// 			category,
	// 			subCategory,
	// 			type,
	// 			state,
	// 			quality
	// 		} = getValues()
	// 		pricingToState.push({
	// 			seasonName: season.label,
	// 			actualOrVintage: actualOrVintage.label,
	// 			categoryName: category.label,
	// 			subCategoryName: subCategory ? subCategory.label : '',
	// 			typeName: type.label,
	// 			stateName: state.label,
	// 			qualityName: quality.label
	// 		})
	// 		setPricing(pricingToState)
	// 		setPricingChanged(false)
	// 	}
	// }, [pricingChanged])

	return (
		<>
			<>
				<div className="justify-around">
					<Header pricingListId={pricingListId} />
					<Import
						pricingListId={pricingListId}
						setApiResponse={setApiResponse}
					/>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Selects
						selectsToShow={selectsToShow}
						control={control}
						handleChange={handleChange}
					/>
					<PriceForm
						mainProductId={mainProductId}
						register={register}
						itsAnUpdate={itsAnUpdate}
					/>
					<PricingTable pricing={pricing} />
				</form>
			</>
			<ApiResponse apiResponse={apiResponse} />
		</>
	)
}

export default ManagePricingList
