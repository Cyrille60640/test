import { Modal } from 'react-bootstrap'
import { Button } from '../../../../../components/templates'
import { ModalSelectorBtn } from '../../../../../components/multiparty'

const MaterialsModal3 = ({
	order,
	setValue,
	showMaterialsModal3,
	setShowMaterialsModal3,
	materialOptions
}) => {
	let { materials } = order.requiredFeatures

	const handleMaterial3Pick = (material3) => {
		setValue('other_material', material3.id)
		document.querySelector('#currentValueMaterial3').innerHTML =
			material3.name
		setShowMaterialsModal3(false)
	}

	if (!(!materials || materials.visible)) {
		return false
	} else {
		return (
			<Modal
				id={'materialsModal3'}
				show={showMaterialsModal3}
				onHide={() => setShowMaterialsModal3(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>Palette de matières</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{materialOptions.map((material) => {
						return (
							<ModalSelectorBtn
								key={`material3-${material.value}`}
								item={material}
								handlePick={handleMaterial3Pick}
							/>
						)
					})}
					<ModalSelectorBtn
						item={{ value: '', label: 'Aucune' }}
						handlePick={handleMaterial3Pick}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						label="Fermer"
						onClick={() => setShowMaterialsModal3(false)}
					/>
				</Modal.Footer>
			</Modal>
		)
	}
}

export default MaterialsModal3
