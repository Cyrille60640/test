import { Modal } from 'react-bootstrap'
import { Button } from '../../../../../components/templates'
import { Link } from 'react-router-dom'

const AfterPrintModal = ({
	showConfirmationModal,
	setShowConfirmationModal,
	setLabelInfos,
	lastsLabelInfos
}) => {
	// Réimpression d'une étiquette:
	const handleRePrint = () => {
		setShowConfirmationModal(false)
		setLabelInfos(lastsLabelInfos)
	}

	if (!lastsLabelInfos) {
		return false
	} else {
		return (
			<Modal
				id={'afterPrintModal'}
				show={showConfirmationModal}
				onHide={() => {
					setLabelInfos()
					setShowConfirmationModal(false)
				}}
			>
				<Modal.Header closeButton>
					<Modal.Title>Confirmation</Modal.Title>
				</Modal.Header>
				<Modal.Body>Produit enregistré en base de données !</Modal.Body>
				<Modal.Footer className="d-flex justify-content-between">
					<div>
						<Button
							label="Réimprimer l'étiquette"
							onClick={handleRePrint}
							className="me-2"
						/>
						<Link to={'/updateProduct/' + lastsLabelInfos.id}>
							<Button
								label="Modifier le produit"
								className="ms-2"
							/>
						</Link>
					</div>
					<div>
						<Button
							label="Produit suivant"
							onClick={() => {
								setLabelInfos()
								setShowConfirmationModal(false)
							}}
							className="me-2"
						/>
					</div>
				</Modal.Footer>
			</Modal>
		)
	}
}

export default AfterPrintModal
