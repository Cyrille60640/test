import { Controller } from 'react-hook-form'
import { Select } from '../../../../../../../components/templates'

const MainMaterialPart = ({
	control,
	errors,
	materialOptions,
	materialRules
}) => {
	if (!(!materialRules || materialRules.visible)) {
		return false
	} else {
		return (
			<>
				<Controller
					control={control}
					name={'mainMaterial'}
					rules={{
						required:
							!materialRules || materialRules.required
								? 'Vous devez indiquer la matière principale..'
								: false
					}}
					render={({ field: { onChange, value } }) => (
						<Select
							name={'mainMaterial'}
							options={materialOptions}
							onChange={onChange}
							placeholder="Sélectionner une matière principale"
							className={`text-center my-3 ${
								errors.mainMaterial && 'is-invalid'
							}`}
							value={value}
						/>
					)}
				/>
				{errors.mainMaterial && (
					<span className="invalid-feedback text-center mb-3">
						{errors.mainMaterial.message}
					</span>
				)}
			</>
		)
	}
}

export default MainMaterialPart
