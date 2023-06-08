const ClassesPart = ({ order, classOptions, register }) => {
	let { classes } = order.requiredFeatures

	if (!(!classes || classes.visible)) {
		return false
	} else {
		return (
			<label htmlFor="classesList">
				Classes:
				<div id="classesList" className="justify-center">
					{classOptions.map((option) => {
						return (
							<div
								key={option.name}
								className="d-flex align-items-center mx-2"
							>
								<label
									className="me-1"
									htmlFor={`class-${option.id}`}
								>
									{option.name}
								</label>
								<input
									id={`class-${option.id}`}
									type="checkbox"
									value={option.id}
									{...register(`class-${option.id}`, {
										// pattern: {
										// 	value: REGSTRING.value,
										// 	message: REGSTRING.message,
										// },
									})}
								/>
							</div>
						)
					})}
				</div>
			</label>
		)
	}
}

export default ClassesPart
