import { REGNUM } from '../../../../../utils/regex'

const TvaPart = ({ register, errors }) => {
	return (
		<div className="mb-3">
			<label htmlFor="description" className="form-label ms-3">
				Valeur:
			</label>
			<input
				type="number"
				className={`form-control ${errors.value && 'is-invalid'}`}
				{...register('value', {
					required: 'Vous devez renseigner une valeur pour la TVA.',
					pattern: {
						value: REGNUM.value,
						message: REGNUM.message
					}
				})}
			/>
			{errors.value && (
				<span className="invalid-feedback text-center">
					{errors.value.message}
				</span>
			)}
		</div>
	)
}

export default TvaPart
