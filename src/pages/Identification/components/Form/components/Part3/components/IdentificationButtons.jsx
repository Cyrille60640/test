import { Button } from '../../../../../../../components/templates'
import { Link } from 'react-router-dom'

const IdentificationButtons = ({ setPart, resetFields, setShowBoxModal }) => {
	return (
		<div className="d-flex align-items-center flex-column w-25 mx-4">
			<div className="d-flex w-100">
				<Button
					label="Réinitialiser"
					className={'w-50 p-5 m-2'}
					onClick={resetFields}
				/>
				<Button
					type="submit"
					data={'validationBtn'}
					label="Valider"
					className={'w-50 p-5 m-2'}
				/>
			</div>
			<div className="d-flex w-100">
				<Button
					label="Retour"
					onClick={() => setPart(1)}
					className={'w-50 p-5 m-2'}
				/>
				<Link className="w-50 m-2" to="/">
					<Button label="Retour à l'accueil" className={'p-5'} />
				</Link>
			</div>
			<Button
				className={'w-50 p-5 m-2'}
				label={'Carton terminé'}
				onClick={() => setShowBoxModal(true)}
			/>
		</div>
	)
}

export default IdentificationButtons
