import { Button } from '../../../../../../../components/templates'

const ColorAndPrintPart = ({
	order,
	errors,
	setShowColorsModal,
	setShowPrintsModal
}) => {
	let { color, print } = order.requiredFeatures

	return (
		<>
			<div className="d-flex">
				{(!color || color.visible) && (
					<div className="d-flex flex-column w-50 me-2">
						<div className="text-center">
							<Button
								label="Couleurs"
								className={
									errors.color && 'invalid-button-feedback'
								}
								onClick={() => setShowColorsModal(true)}
							/>
						</div>
						<span>
							Valeur sélectionnée:{' '}
							<span id="currentValueColor"></span>
						</span>
					</div>
				)}
				{(!print || print.visible) && (
					<div className="d-flex flex-column w-50 ms-2">
						<div className="text-center">
							<Button
								label="Imprimés"
								className={
									errors.print && 'invalid-button-feedback'
								}
								onClick={() => setShowPrintsModal(true)}
							/>
						</div>
						<span>
							Valeur sélectionnée:{' '}
							<span id="currentValuePrint"></span>
						</span>
					</div>
				)}
			</div>
			{errors.color && (
				<span className="invalid-feedback d-block text-center">
					{errors.color.message}
				</span>
			)}
			{errors.print && (
				<span className="invalid-feedback d-block text-center">
					{errors.print.message}
				</span>
			)}
		</>
	)
}

export default ColorAndPrintPart
