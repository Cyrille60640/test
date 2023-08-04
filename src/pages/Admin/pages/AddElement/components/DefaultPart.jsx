import { REGSTRING } from '../../../../../utils/regex'

const DefaultPart = ({ register, errors }) => {
	return (
		<div className="mb-3">
			<label htmlFor="description" className="form-label ms-3">
				Nom:
			</label>
			<input
				type="text"
				className={`form-control ${errors.name && 'is-invalid'}`}
				{...register('name', {
					required: "Vous devez renseigner un nom pour l'élément.",
					pattern: {
						value: REGSTRING.value,
						message: REGSTRING.message
					}
				})}
			/>
			{errors.name && (
				<span className="invalid-feedback text-center">
					{errors.name.message}
				</span>
			)}
		</div>
	)
}

export default DefaultPart
