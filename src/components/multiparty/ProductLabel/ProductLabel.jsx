import './ProductLabel.scss'
import { logoLineDark } from '../../../assets'
import Img from '../../templates/Img'
import { memo } from 'react'
import { useState, useEffect } from 'react'
import { handleElementDisplay } from '../../../utils/functions'

const ProductLabel = ({
	labelInfos,
	setLabelInfos,
	idsToDNone,
	classesToDNone,
	functionAfterPrint
}) => {
	// * Destructuration des props:
	const {
		bar_code,
		typeName,
		categoryName,
		sizeName,
		brandName,
		qualityName,
		stateName,
		price,
		startDate,
		ref,
		priceAndEan13OnLabel
	} = labelInfos ?? {}

	// * Gestion de l'impression:
	const [ean13Loaded, setEan13Loaded] = useState(false),
		[logoLoaded, setLogoLoaded] = useState(false)
	useEffect(() => {
		if (
			(!priceAndEan13OnLabel || ean13Loaded) &&
			logoLoaded &&
			labelInfos
		) {
			handleElementDisplay('add', idsToDNone, classesToDNone)
			setTimeout(() => {
				window.print()
			}, 500)
		}
	}, [ean13Loaded, logoLoaded, labelInfos])

	// * Gestion de l'après impression:
	window.addEventListener('afterprint', () => {
		if (labelInfos) {
			// ! Obsolète car on est passé sur du react-select, à revoir:
			// document.querySelectorAll('.actionsSelect').forEach((select) => {
			// 	select.value = { value: '', label: '' }
			// })

			setLabelInfos()
			handleElementDisplay('remove', idsToDNone, classesToDNone)
			if (functionAfterPrint) {
				functionAfterPrint()
			}
		}
	})

	// * Logo:
	const LabelLogo2 = memo(() => {
		return (
			<Img
				id="labelLogo2"
				src={logoLineDark}
				alt="Logo Sapée"
				className={'mt-3'}
				onLoad={() => setLogoLoaded(true)}
			/>
		)
	})

	// * Rendu:
	if (!labelInfos) {
		return false
	} else {
		return (
			<div id="label2">
				<div className="justify-align-center flex-column py-1 border-bottom-dashed">
					<LabelLogo2 />
					<span className="mb-1 fw-bold">www.sapee.fr</span>
					{/* <ul className='text-decoration-none'> */}
					<ul className="text-decoration-none mb-2 p-0">
						<li className="text-center">{typeName}</li>
						<li className="text-center">{categoryName}</li>
						<li className="text-center">{brandName}</li>
						{sizeName !== null && (
							<li className="text-center">Taille: {sizeName}</li>
						)}
						<li className="text-center">{stateName}</li>
						<li className="text-center">{qualityName}</li>
					</ul>
					<div id="ean13Container" className="mb-2">
						{priceAndEan13OnLabel === 1 && (
							<img
								id="imgBarCode2"
								alt="Barcode Generator TEC-IT"
								src={`https://barcode.tec-it.com/barcode.ashx?data=${bar_code}&code=EAN13`}
								onLoad={() => setEan13Loaded(true)}
							/>
						)}
					</div>
				</div>
				<div className="align-center flex-column pt-1">
					<span id="date2">{startDate.substring(0, 10)}</span>
					<span id="barcode2">*{ref}*</span>
					<span id="ref2">{ref}</span>
					{priceAndEan13OnLabel === 1 && (
						<span id="price2" className="mt-1">
							{price} €
						</span>
					)}
				</div>
			</div>
		)
	}
}

export default ProductLabel
