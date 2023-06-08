const MeasuresPart = ({ order, errors, register }) => {
	let { measures: measuresRules } = order.requiredFeatures

	if (!(!measuresRules || measuresRules.visible)) {
		return false
	} else {
		return (
			<div>
				<label>Longueur, largeur et profondeur en cm:</label>
				<div className="justify-around">
					<div className="w-25">
						<input
							type="number"
							className={
								!errors.length
									? 'form-control text-center'
									: 'form-control is-invalid text-center'
							}
							{...register('length', {
								required:
									measuresRules && measuresRules.required
										? 'Vous devez indiquer une longueur.'
										: false
								// pattern: {
								// 	value: REGSTRING.value,
								// 	message: REGSTRING.message,
								// },
							})}
							placeholder="Longueur"
						/>
						{errors.length && (
							<span className="invalid-feedback text-center mb-3">
								{errors.length.message}
							</span>
						)}
					</div>
					<div className="w-25">
						<input
							type="number"
							className={
								!errors.width
									? 'form-control text-center'
									: 'form-control is-invalid text-center'
							}
							{...register('width', {
								required:
									measuresRules && measuresRules.required
										? 'Vous devez indiquer une largeur.'
										: false
								// pattern: {
								// 	value: REGSTRING.value,
								// 	message: REGSTRING.message,
								// },
							})}
							placeholder="Largeur"
						/>
						{errors.width && (
							<span className="invalid-feedback text-center mb-3">
								{errors.width.message}
							</span>
						)}
					</div>
					<input
						type="number"
						className="form-control text-center w-25"
						{...register('third_measure', {
							// pattern: {
							// 	value: REGSTRING.value,
							// 	message: REGSTRING.message,
							// },
						})}
						placeholder="3ème mesure"
					/>
				</div>
			</div>
		)
	}
}

export default MeasuresPart
