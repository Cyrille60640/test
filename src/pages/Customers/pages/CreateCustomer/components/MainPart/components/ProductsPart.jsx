import {
	Div,
	Select,
	SubTitle,
	Switch
} from '../../../../../../../components/templates'

const ProductsPart = ({
	control,
	errors,
	datas,
	setCheckParameters,
	boxProcessMode,
	setBoxProcessMode
}) => {
	// * Déclarations:
	const { brands, qualities } = datas

	return (
		<>
			<SubTitle label={'Produits'} className={'text-center'} />

			<Switch
				control={control}
				name={'processMode'}
				label={'Activer le process par code article/box ?'}
				className={'my-2'}
				additionnalOnChange={setBoxProcessMode}
			/>

			{!boxProcessMode && (
				<Div className={'my-2 justify-between align-center'}>
					<Switch
						control={control}
						name={'check_parameter'}
						label={'Vérification des paramêtres ?:'}
						className={'my-2'}
						additionnalOnChange={setCheckParameters}
					/>

					<Select
						control={control}
						name={'qualities'}
						options={qualities.options}
						className={'w-80'}
						placeholder={'Sélectionner les qualités autorisées'}
						rules={{
							required:
								'Vous devez indiquer des qualités autorisées.'
						}}
						errors={errors}
						isMulti
					/>
				</Div>
			)}

			<Select
				control={control}
				name={'forbiddenBrands'}
				options={brands.options}
				className={'my-2'}
				placeholder={'Sélectionner les marques refusées'}
				errors={errors}
				isMulti
			/>
		</>
	)
}

export default ProductsPart
