import { Select } from '../../../../../../../components/templates'

const SizePart = ({ sizes, order, control, errors, getValues }) => {
	let { size } = order.requiredFeatures

	// Récupération des tailles par rapport à la catégorie:
	// const [filteredOptions, setFilteredOptions] = useState([])
	// console.log(sizeOptions)
	// useEffect(() => {
	// 	let { category } = getValues(),
	// 		optionsToState = sizeOptions.filter(
	// 			(option) => option.id_category === category.value
	// 		)
	// 	setFilteredOptions(optionsToState)
	// }, [])

	// Gestion des Sans Taille:
	const handleSizeChange = (sizeId) => {
		// setRequiredMeasures(
		// 	sizeId === 312 ? 'required' : requiredMeasuresInSystem
		// )
	}

	if (!(!size || size.visible)) {
		return false
	} else {
		return (
			<Select
				control={control}
				name={'size'}
				options={sizes.options}
				className={'text-center'}
				placeholder={'Sélectionner une taille'}
				rules={{
					required:
						!size || size.required
							? 'Vous devez indiquer une taille.'
							: false
				}}
				errors={errors}
				additionnalOnChange={(value) => {
					handleSizeChange(value)
				}}
			/>
		)
	}
}

export default SizePart
