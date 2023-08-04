import { Button } from '../../../../../components/templates'

const PriceForm = ({ mainProductId, register, itsAnUpdate }) => {
	if (mainProductId !== undefined) {
		return (
			<div className="justify-center">
				<div className="align-center flex-column border border-dark p-3">
					<span className="text-decoration-underline">
						{'MainProductId => ' + mainProductId}
					</span>
					<label htmlFor="price" className="w-50 my-3">
						Prix:
						<input
							id="price"
							step="0.01"
							type="number"
							className="ms-2 w-50"
							{...register('price')}
						/>
					</label>
					<Button
						type="submit"
						label={!itsAnUpdate ? 'Créer' : 'Modifier'}
					/>
				</div>
			</div>
		)
	}
}

export default PriceForm
