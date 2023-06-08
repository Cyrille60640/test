import { Modal } from 'react-bootstrap'
import { Button } from '../../../../../components/templates'
import { ModalSelectorBtn } from '../../../../../components/multiparty'

const ColorsModal = ({
	order,
	register,
	setValue,
	showColorsModal,
	setShowColorsModal,
	colorOptions,
	setShowPrintsModal,
	setShowMaterialsModal1
}) => {
	let {
		color: colorRules,
		print: printRules,
		material: materialRules
	} = order.requiredFeatures

	const handleColorPick = (color) => {
		setValue('color', color.id)
		document.querySelector('#currentValueColor').innerHTML = color.name
		setShowColorsModal(false)

		// Chainage sur la prochaine modal:
		if (!printRules || printRules.visible) {
			setShowPrintsModal(true)
		} else if (!materialRules || materialRules.visible) {
			setShowMaterialsModal1(true)
		}
	}

	if (!(!colorRules || colorRules.visible)) {
		return false
	} else {
		return (
			<>
				<Modal
					id={'colorsModal'}
					show={showColorsModal}
					onHide={() => setShowColorsModal(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title>Palette de couleurs</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{colorOptions.map((color) => {
							return (
								<ModalSelectorBtn
									key={`color-${color.id}`}
									item={color}
									handlePick={handleColorPick}
								/>
							)
						})}
					</Modal.Body>
					<Modal.Footer>
						<Button
							label="Fermer"
							onClick={() => setShowColorsModal(false)}
						/>
					</Modal.Footer>
				</Modal>
				<input
					className="d-none"
					{...register('color', {
						required:
							!colorRules || colorRules.required
								? 'Vous devez renseigner une couleur pour le produit.'
								: false
					})}
				/>
			</>
		)
	}
}

export default ColorsModal
