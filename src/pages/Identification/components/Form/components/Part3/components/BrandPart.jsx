import { Button, Div, Select } from '../../../../../../../components/templates'
import { useState, useEffect } from 'react'
import { getPriceForIdentification } from '../../../../../../../services'
// // import sendMail from '../../../../../utils/mail'

const BrandPart = ({
	brands,
	control,
	errors,
	setValue,
	getValues,
	setShowUndefinedBrandModal,
	setProductDatas,
	setApiResponse,
	order
}) => {
	// * Récupération des marques avec la qualité en parenthèses:
	const [brandOptions, setBrandOptions] = useState([])
	useEffect(() => {
		let brandToState = []
		brands.options.forEach((brand) => {
			brandToState.push({
				...brand,
				label: `${brand.label} (${brand.quality.name})`
			})
		})
		setBrandOptions(brandToState)
	}, [])

	// * Au changement de marque:
	const handleBrandChange = async (brand) => {
		// Déclarations:
		let { forbiddenBrands, stylesQualities } = order,
			{ category, type, state, season, style } = getValues(),
			{ value, quality } = brand,
			isValidQuality = false,
			maxPriceSetted

		// On check si la marque est autorisée:
		forbiddenBrands.forEach((brand) => {
			if (brand.value === value) {
				setValue('brand', '')
				return setApiResponse({
					type: 'error',
					message: 'Marque refusée, passez au produit suivant.'
				})
			}
		})

		// On check si la qualité de la marque est défini:
		if (quality.id === 5) {
			setValue('brand', '')
			return setApiResponse({
				type: 'error',
				message: 'Marque non-défini.'
			})
			// // alert('Marque non-défini, Mme Gravier a été notifié.')
			// // sendMail('undefinedBrand', { id, name })
		}

		// On check si la qualité de la marque est autorisée:
		stylesQualities.forEach((styleQuality) => {
			let { id_style, id_quality, max_price } = styleQuality
			if (id_style === style.value && id_quality === quality.id) {
				isValidQuality = true
				maxPriceSetted = max_price
			}
		})

		if (!isValidQuality) {
			setValue('brand', '')
			return setApiResponse({
				type: 'error',
				message: 'Qualité de marque refusée, passez au produit suivant.'
			})
		}

		// On récupère le prix:
		getPriceForIdentification({
			category,
			order,
			quality,
			season,
			state,
			style,
			type
		}).then((datas) => {
			if (maxPriceSetted < datas.price) {
				return setApiResponse({
					type: 'error',
					message: 'Prix trop élevé, passez au produit suivant.'
				})
			}

			setProductDatas(datas)
		})
	}

	return (
		<>
			<Div className="align-center">
				<Div className="w-75">
					<Select
						control={control}
						name={'brand'}
						options={brandOptions}
						className={'text-center'}
						placeholder={'Sélectionner une marque'}
						rules={{
							required:
								'Vous devez indiquer la marque du produit..'
						}}
						errors={errors}
						additionnalOnChange={(value) => {
							handleBrandChange(value)
						}}
					/>
				</Div>
				<Button
					label="Marque introuvable"
					className={'ms-2'}
					onClick={() => setShowUndefinedBrandModal(true)}
				/>
			</Div>
		</>
	)
}

export default BrandPart
