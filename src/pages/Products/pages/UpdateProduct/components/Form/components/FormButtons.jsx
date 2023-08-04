import { Button } from '../../../../../../../components/templates'
import { useNavigate } from 'react-router-dom'

const FormButtons = ({ locationState, productRef }) => {
	// Gestion du bouton retour selon si on vient de la page products ou validProducts:
	const navigate = useNavigate(),
		handleNavigation = () => {
			if (!locationState) {
				navigate('/products')
			} else {
				// Redirection autre page:
				switch (locationState.from) {
					case '/validProducts':
						navigate('/validProducts', {
							state: locationState
						})
						break

					case '/searchProduct':
						navigate('/searchProduct', {
							state: { productRef }
						})
						break

					default:
						navigate(locationState.from)
				}
			}
		}

	return (
		<div className="justify-center mt-4">
			<Button
				label="Retour"
				classList="me-2"
				onClick={handleNavigation}
			/>
			<Button type="submit" label="Valider" classList="mx-2" />
		</div>
	)
}

export default FormButtons
