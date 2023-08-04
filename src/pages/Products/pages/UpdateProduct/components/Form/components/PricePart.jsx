import { useContext, useState } from 'react'
import { Context } from '../../../../../../../Logger'

const PricePart = ({ register }) => {
	// * Récupération de l'utilisateur:
	const { lastname } = useContext(Context),
		[priceCanBeUpdate, setPriceCanBeUpdate] = useState(false)

	useState(() => {
		if (
			lastname === 'Zerroug0' ||
			lastname === 'Zerroug1' ||
			lastname === 'Zerroug2' ||
			lastname === 'Gravier' ||
			lastname === 'Bigorgne' ||
			lastname === 'Mancheron'
		) {
			setPriceCanBeUpdate(true)
		}
	}, [])

	return (
		<div className="d-flex my-3">
			<label className="d-flex flex-column">
				<span className="ps-2">Prix d'origine:</span>
				<input
					type="number"
					className="form-control text-center me-2"
					disabled={!priceCanBeUpdate}
					placeholder="Prix d'origine"
					{...register('originPrice', {
						required: "Vous devez indiquer le prix d'origine."
					})}
				/>
			</label>
			<label className="d-flex flex-column">
				<span className="ps-2">Prix actuel:</span>
				<input
					type="number"
					className="form-control text-center ms-2"
					disabled={!priceCanBeUpdate}
					placeholder="Prix"
					{...register('price', {
						required: 'Vous devez indiquer le prix actuel.'
					})}
				/>
			</label>
		</div>
	)
}

export default PricePart
