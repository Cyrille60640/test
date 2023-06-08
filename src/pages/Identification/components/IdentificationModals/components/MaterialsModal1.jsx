import { Modal } from 'react-bootstrap'
import { Button } from '../../../../../components/templates'
import { ModalSelectorBtn } from '../../../../../components/multiparty'

const MaterialsModal1 = ({
	order,
	setValue,
	showMaterialsModal1,
	setShowMaterialsModal1,
	materialOptions
}) => {
	let { materials: materialsRules } = order.requiredFeatures

	const handleMaterial1Pick = (material1) => {
		setValue('main_material', material1.id)
		let secondaryMaterialButton = document.querySelector(
			'#secondary_material_button'
		)
		let otherMaterialButton = document.querySelector(
			'#other_material_button'
		)
		if (material1.id !== '') {
			secondaryMaterialButton.classList.remove('d-none')
		} else {
			secondaryMaterialButton.classList.add('d-none')
			setValue('secondary_material', '')
			otherMaterialButton.classList.add('d-none')
			setValue('other_material', '')
		}
		document.querySelector('#currentValueMaterial1').innerHTML =
			material1.name
		setShowMaterialsModal1(false)
	}

	console.log('modal1 render')

	if (!(!materialsRules || materialsRules.visible)) {
		return false
	} else {
		return (
			<>
				<Modal
					id={'materialsModal1'}
					show={showMaterialsModal1}
					onHide={() => setShowMaterialsModal1(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title>Palette de matières</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{materialOptions.map((material) => {
							return (
								<ModalSelectorBtn
									key={`material1-${material.value}`}
									item={material}
									handlePick={handleMaterial1Pick}
								/>
							)
						})}
					</Modal.Body>
					<Modal.Footer>
						<Button
							label="Fermer"
							onClick={() => setShowMaterialsModal1(false)}
						/>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

export default MaterialsModal1
