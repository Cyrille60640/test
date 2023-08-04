import { Controller } from 'react-hook-form'
import { Select } from '../../../../../../../components/templates'

const ColorPart = ({ control, errors, provisoireColors, colorRules }) => {
	if (!(!colorRules || colorRules.visible)) {
		return false
	} else {
		return (
			<>
				<Controller
					control={control}
					name={'color'}
					rules={{
						required:
							!colorRules || colorRules.required
								? 'Vous devez indiquer la couleur du produit'
								: false
					}}
					render={({ field: { onChange, value } }) => (
						<Select
							name={'color'}
							options={provisoireColors}
							onChange={onChange}
							placeholder={'Sélectionner une couleur'}
							className={`text-center my-3 ${
								errors.color && 'is-invalid'
							}`}
							value={value}
						/>
					)}
				/>
				{errors.color && (
					<span className="invalid-feedback text-center mb-3">
						{errors.color.message}
					</span>
				)}
			</>
		)
	}
}

export default ColorPart
