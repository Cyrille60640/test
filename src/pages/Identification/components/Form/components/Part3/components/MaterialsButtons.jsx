import { Button } from '../../../../../../../components/templates'

const MaterialsButtons = ({
	order,
	register,
	errors,
	setShowMaterialsModal1,
	setShowMaterialsModal2,
	setShowMaterialsModal3
}) => {
	let { material: materialRules } = order.requiredFeatures

	if (!(!materialRules || materialRules.visible)) {
		return false
	} else {
		return (
			<>
				<div className="justify-around mt-3">
					<Button
						label="Matière 1"
						className={
							errors.main_material && 'invalid-button-feedback'
						}
						onClick={() => setShowMaterialsModal1(true)}
					/>
					<Button
						data="secondary_material_button"
						label="Matière 2"
						className={`d-none ${
							errors.secondary_material &&
							'invalid-button-feedback'
						}`}
						onClick={() => setShowMaterialsModal2(true)}
					/>
					<Button
						data="other_material_button"
						label="Matière 3"
						className={`d-none ${
							errors.other_material && 'invalid-button-feedback'
						}`}
						onClick={() => setShowMaterialsModal3(true)}
					/>
				</div>
				<div className="d-flex flex-column">
					<span>
						Valeur sélectionnée: 1:
						<span id="currentValueMaterial1"></span> 2:
						<span id="currentValueMaterial2"></span> 3:
						<span id="currentValueMaterial3"></span>
					</span>
					<input
						className={`d-none${
							errors.main_material ? ' is-invalid' : ''
						}`}
						{...register('main_material', {
							required:
								!materialRules || materialRules.required
									? 'Vous devez renseigner une matière pour le produit.'
									: false
						})}
					/>
					{errors.main_material && (
						<span className="invalid-feedback text-center mb-3">
							{errors.main_material.message}
						</span>
					)}
					<input
						id="secondary_material"
						className="d-none"
						{...register('secondary_material')}
					/>
					<input
						id="other_material"
						className="d-none"
						{...register('other_material')}
					/>
				</div>
			</>
		)
	}
}

export default MaterialsButtons
