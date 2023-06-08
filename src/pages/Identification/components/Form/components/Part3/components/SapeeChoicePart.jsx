import { useEffect, useState } from 'react'

const SapeeChoicePart = ({ order, register, productDatas }) => {
	const { sapeeChoice } = order.requiredFeatures,
		[checked, setChecked] = useState(false)

	useEffect(() => {
		if (
			productDatas &&
			productDatas.id_quality === 1 &&
			order &&
			order.value === 3
		) {
			setChecked(true)
		}
	}, [order, productDatas])

	if (!(!sapeeChoice || sapeeChoice.visible)) {
		return false
	} else {
		return (
			<div className="justify-center mt-3">
				<label htmlFor="sapee_choice">
					Choix Sapée ?:
					<input
						id="sapee_choice"
						type="checkbox"
						className="ms-2"
						{...register('sapee_choice')}
						disabled={
							productDatas &&
							order &&
							productDatas.id_quality === 1 &&
							order.value === 3
						}
						checked={checked}
						onChange={(e) => setChecked(e.target.checked)}
					/>
				</label>
			</div>
		)
	}
}

export default SapeeChoicePart
