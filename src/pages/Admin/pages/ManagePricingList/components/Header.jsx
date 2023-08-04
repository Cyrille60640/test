import { Link } from 'react-router-dom'
import { Button } from '../../../../../components/templates'

const Header = ({ pricingListId }) => {
	return (
		<div className="justify-align-center flex-column py-3">
			<h2>Ajouter un prix à la liste n°{pricingListId}:</h2>
			<Link to="/manageDB/pricingList">
				<Button label={'Retour'} />
			</Link>
		</div>
	)
}

export default Header
