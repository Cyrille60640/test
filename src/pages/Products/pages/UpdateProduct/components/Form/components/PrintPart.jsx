import { Controller } from 'react-hook-form'
import { Select } from '../../../../../../../components/templates'

const PrintPart = ({ control, errors, printOptions, printRules }) => {
	if (!(!printRules || printRules.visible)) {
		return false
	} else {
		return (
			<>
				<Controller
					control={control}
					name={'print'}
					rules={{
						required:
							!printRules || printRules.required
								? "Vous devez indiquer l'imprimé du produit.."
								: false
					}}
					render={({ field: { onChange, value } }) => (
						<Select
							name={'print'}
							options={printOptions}
							onChange={onChange}
							placeholder={'Sélectionner un imprimé'}
							className={`text-center my-3 ${
								errors.print && 'is-invalid'
							}`}
							value={value}
						/>
					)}
				/>
				{errors.print && (
					<span className="invalid-feedback text-center mb-3">
						{errors.print.message}
					</span>
				)}
			</>
		)
	}
}

export default PrintPart
