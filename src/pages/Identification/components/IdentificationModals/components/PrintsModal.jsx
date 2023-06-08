import { Modal } from 'react-bootstrap'
import { Button } from '../../../../../components/templates'
import { ModalSelectorBtn } from '../../../../../components/multiparty'

const PrintsModal = ({
	order,
	register,
	setValue,
	showPrintsModal,
	setShowPrintsModal,
	printOptions,
	setShowMaterialsModal1
}) => {
	let { print: printRules, material: materialRules } = order.requiredFeatures

	const handlePrintPick = (print) => {
		setValue('print', print.id)
		document.querySelector('#currentValuePrint').innerHTML = print.name
		setShowPrintsModal(false)

		// Chainage sur la prochaine modal:
		if (!materialRules || materialRules.visible) {
			setShowMaterialsModal1(true)
		}
	}

	if (!(!printRules || printRules.visible)) {
		return false
	} else {
		return (
			<>
				<Modal
					id={'printsModal'}
					show={showPrintsModal}
					onHide={() => setShowPrintsModal(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title>Palette d'imprimés</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{printOptions.map((print) => {
							return (
								<ModalSelectorBtn
									key={`print-${print.value}`}
									item={print}
									handlePick={handlePrintPick}
								/>
							)
						})}
					</Modal.Body>
					<Modal.Footer>
						<Button
							label="Fermer"
							onClick={() => setShowPrintsModal(false)}
						/>
					</Modal.Footer>
				</Modal>
				<input
					className="d-none"
					{...register('print', {
						required:
							!printRules || printRules.required
								? 'Vous devez renseigner un imprimé pour le produit.'
								: false
					})}
				/>
			</>
		)
	}
}

export default PrintsModal
