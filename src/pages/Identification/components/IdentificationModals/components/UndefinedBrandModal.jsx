import { Modal } from 'react-bootstrap'
import { Button } from '../../../../../components/templates'
import axios from 'axios'

const UndefinedBrandModal = ({
	showUndefinedBrandModal,
	setShowUndefinedBrandModal,
	setApiResponse
}) => {
	// Gestion d'une nouvelle marque:
	const handleNewBrand = () => {
		let newBrandValue = document.querySelector('#newBrand').value
		axios
			.post(
				process.env.REACT_APP_API_DOMAIN +
					'brand/createOneFromIdentification',
				{ name: newBrandValue }
			)
			.then((res) => {
				setApiResponse({
					type: 'success',
					message: res.data.message + '\n Passez au produit suivant !'
				})
			})
			.finally(() => {
				setShowUndefinedBrandModal(false)
			})
	}

	return (
		<Modal
			id={'undefinedBrandModal'}
			show={showUndefinedBrandModal}
			onHide={() => setShowUndefinedBrandModal(false)}
		>
			<Modal.Header closeButton>
				<Modal.Title>Définir une nouvelle marque</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<input id="newBrand" className="w-100" type="text" />
			</Modal.Body>
			<Modal.Footer>
				<Button
					label="Fermer"
					onClick={() => setShowUndefinedBrandModal(false)}
				/>
				<Button label="Valider" onClick={() => handleNewBrand(false)} />
			</Modal.Footer>
		</Modal>
	)
}

export default UndefinedBrandModal
