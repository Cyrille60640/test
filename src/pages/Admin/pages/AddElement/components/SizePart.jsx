import { REGID } from '../../../../../utils/regex'

const SizePart = ({ register, errors }) => {
	return (
		<div className="mb-3">
			<label htmlFor="universal_size" className="form-label ms-3">
				Taille universelle:
			</label>
			<input
				type="text"
				className={`form-control ${
					errors.universal_size && 'is-invalid'
				}`}
				{...register('universal_size', {
					required: "Vous devez renseigner un nom pour l'élément.",
					pattern: {
						value: REGID.value,
						message: REGID.message
					}
				})}
			/>
			{errors.universal_size && (
				<span className="invalid-feedback text-center">
					{errors.universal_size.message}
				</span>
			)}
		</div>
	)
}

export default SizePart
