import { useParams, Link } from 'react-router-dom'
import { Button, Div, Form, Title } from '../../../../components/templates'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getFrenchTitleForTable } from '../../../../utils/functions'
import { useNavigate } from 'react-router-dom'
import {
	getForbiddenBrandsForADistributor,
	getQualitiesForADistributor
} from '../../../../services'

// Parts imports:
import { DefaultPart, PricingListPart, SizePart, TvaPart } from './components'

const AddElement = () => {
	// * Déclarations:
	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { errors }
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		shouldFocusError: true
	})

	// * Hooks navigation:
	const navigate = useNavigate()

	// * Génération du titre avec la table en cours de traitement:
	const table = useParams().table,
		[title, setTitle] = useState('')
	useEffect(() => {
		setTitle(getFrenchTitleForTable(table))
	}, [])

	// * Gestion de l'update:
	let elementId = useParams().id
	useEffect(() => {
		if (elementId !== undefined) {
			let urlToGET = table !== 'undefinedBrand' ? table : 'brand'
			axios
				.get(
					`${process.env.REACT_APP_API_DOMAIN}${urlToGET}/${elementId}`
				)
				.then((res) => {
					let { datas } = res.data
					setValue('name', datas.name)
					switch (table) {
						case 'brand':
						case 'undefinedBrand':
							let { id_quality, qualityName } = datas
							setValue('id_quality', {
								value: id_quality,
								label: qualityName
							})
							break
						case 'size':
							setValue('id_size_type', datas.id_size_type)
							break
						case 'tva':
							setValue('value', datas.value)
							break
						case 'receiver':
							setValue('ecommerce', datas.ecommerce ? '1' : '0')
							setValue(
								'priceAndEan13OnLabel',
								datas.priceAndEan13OnLabel ? '1' : '0'
							)
							getQualitiesForADistributor(elementId).then(
								(data) => {
									setValue('qualities', data.datas)
								}
							)
							getForbiddenBrandsForADistributor(elementId).then(
								(data) => {
									setValue('forbiddenBrands', data.datas)
								}
							)
							break
						case 'pricingList':
							let {
								start_date,
								end_date,
								distributorId,
								distributorName,
								tvaId,
								tvaName
							} = datas
							setValue('start_date', start_date.substring(0, 10))
							if (end_date) {
								setValue('end_date', end_date.substring(0, 10))
							}
							setValue('distributor', {
								value: distributorId,
								label: distributorName
							})
							setValue('tva', { value: tvaId, label: tvaName })
							break
						default:
					}
				})
		}
	}, [])

	// * Fonction de soumission:
	const onSubmit = async (data) => {
		let body = { name: data.name }
		switch (table) {
			case 'brand':
			case 'undefinedBrand':
				body['id_quality'] = data.id_quality.value
				break
			case 'size':
				body['id_size_type'] = data.id_size_type
				// ! A retirer:
				body['id_category'] = 1
				break
			case 'tva':
				body['value'] = data.value
				break
			case 'receiver':
				body['ecommerce'] = data.ecommerce
				body['priceAndEan13OnLabel'] = data.priceAndEan13OnLabel
				body['defaultTva'] = 1
				body['stockValorisationPrice'] = 'PVC'
				body['qualities'] = data.qualities
				body['forbiddenBrands'] = data.forbiddenBrands
				break
			case 'pricingList':
				body['start_date'] = data.start_date
				body['end_date'] = data.end_date ? data.end_date : null
				body['id_distributor'] = data.distributor.value
				body['id_tva'] = data.tva.value
				break
			default:
		}

		let response,
			tableToGET = table.substring(0, table.length - 1)
		if (elementId === undefined) {
			response = await axios.post(
				`${process.env.REACT_APP_API_DOMAIN}${tableToGET}`,
				body
			)
		} else {
			response = await axios.put(
				`${process.env.REACT_APP_API_DOMAIN}${tableToGET}/${elementId}`,
				body
			)
		}

		if (response.status === 201 || response.status === 200) {
			if (elementId === undefined) {
				// setValue('name', '')
				// switch (table) {
				// 	case 'brand':
				// 	case 'undefinedBrand':
				// 		setValue('id_quality', '')
				// 		break
				// 	case 'size':
				// 		setValue('id_size_type', '')
				// 		break
				// 	case 'tva':
				// 		setValue('value', '')
				// 		break
				// 	case 'receiver':
				// 		setValue('qualities', '')
				// 		break
				// 	case 'pricingList':
				// 		setValue('start_date', '')
				// 		setValue('end_date', '')
				// 		setValue('distributor', '')
				// 		setValue('tva', '')
				// 	default:
				// }

				// setTimeout(() => {
				// 	setApiResponse()
				// }, 1500)

				setTimeout(() => {
					window.location.reload(false)
				}, 1500)
			} else {
				navigate('/manageDB/' + table, {
					state: {
						snackParams: {
							message: response.data.message,
							severity: 'success'
						}
					}
				})
			}
		}
	}

	return (
		<>
			<Div className={'justify-align-center flex-column h-100'}>
				<Title title={title} />

				<Form
					id={'addElement'}
					className={'p-4 w-75'}
					onSubmit={handleSubmit(onSubmit)}
				>
					<DefaultPart register={register} errors={errors} />

					{table === 'size' && (
						<SizePart register={register} errors={errors} />
					)}

					{table === 'tva' && (
						<TvaPart register={register} errors={errors} />
					)}

					{table === 'pricingList' && (
						<PricingListPart
							control={control}
							register={register}
							errors={errors}
							setValue={setValue}
						/>
					)}

					<Div className={'justify-center mt-3'}>
						<Link to={`/admin/${table}`}>
							<Button label={'Retour'} />
						</Link>
						<Button
							type={'submit'}
							classList={'ms-3'}
							label={
								elementId === undefined ? 'Ajouter' : 'Modifier'
							}
						/>
					</Div>
				</Form>
			</Div>
		</>
	)
}

export default AddElement
