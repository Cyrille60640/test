import { Controller } from 'react-hook-form'
import { Select } from '../../../../../../../components/templates'
import { useState, useEffect } from 'react'

const SizePart = ({
	control,
	errors,
	getValues,
	sizeOptions,
	sizeRules,
	refreshGetValues
}) => {
	// // Récupération des tailles par rapport à la catégorie:
	// const [filteredOptions, setFilteredOptions] = useState([])
	// useEffect(() => {
	// 	let { category } = getValues(),
	// 		optionsToState = sizeOptions.filter(
	// 			(option) => option.id_category === category.value
	// 		)
	// 	console.log(1)
	// 	setFilteredOptions(optionsToState)
	// }, [refreshGetValues])

	if (!(!sizeRules || sizeRules.visible)) {
		return false
	} else {
		return (
			<>
				<Controller
					control={control}
					name={'size'}
					rules={{
						required:
							!sizeRules || sizeRules.required
								? 'Vous devez indiquer la taille du produit..'
								: false
					}}
					render={({ field: { onChange, value } }) => (
						<Select
							name={'size'}
							options={sizeOptions}
							onChange={onChange}
							placeholder={'Sélectionner une taille'}
							className={`text-center my-3 ${
								errors.size && 'is-invalid'
							}`}
							value={value}
						/>
					)}
				/>
				{errors.size && (
					<span className="invalid-feedback text-center mb-3">
						{errors.size.message}
					</span>
				)}
			</>
		)
	}
}

export default SizePart
