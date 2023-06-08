import { Modal } from 'react-bootstrap'
import { Button } from '../../../../../components/templates'
import { ModalSelectorBtn } from '../../../../../components/multiparty'

const MaterialsModal2 = ({
	order,
	setValue,
	showMaterialsModal2,
	setShowMaterialsModal2,
	materialOptions
}) => {
	let { materials } = order.requiredFeatures

	const handleMaterial2Pick = (material2) => {
		setValue('secondary_material', material2.id)
		let otherMaterialButton = document.querySelector(
			'#other_material_button'
		)
		if (material2.id !== '') {
			otherMaterialButton.classList.remove('d-none')
		} else {
			otherMaterialButton.classList.add('d-none')
		}
		document.querySelector('#currentValueMaterial2').innerHTML =
			material2.name
		setShowMaterialsModal2(false)
	}

	console.log('modal2 render')

	if (!(!materials || materials.visible)) {
		return false
	} else {
		return (
			<Modal
				id={'materialsModal2'}
				show={showMaterialsModal2}
				onHide={() => setShowMaterialsModal2(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>Palette de matières</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{materialOptions.map((material) => {
						return (
							<ModalSelectorBtn
								key={`material2-${material.value}`}
								item={material}
								handlePick={handleMaterial2Pick}
							/>
						)
					})}
					<ModalSelectorBtn
						item={{ value: '', label: 'Aucune' }}
						handlePick={handleMaterial2Pick}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						label="Fermer"
						onClick={() => setShowMaterialsModal2(false)}
					/>
				</Modal.Footer>
			</Modal>
		)
	}
}

export default MaterialsModal2
