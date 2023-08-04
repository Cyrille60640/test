import { Row, Col } from 'react-bootstrap'
import {
	ClassesCheckboxs,
	MeasuresPart
} from '../../../../../../components/multiparty'
import {
	ActualOrVintagePart,
	BrandPart,
	CategoryPart,
	ColorPart,
	DescriptionPart,
	FormButtons,
	MainMaterialPart,
	OrderPart,
	OtherMaterialPart,
	PricePart,
	PrintPart,
	SapeeChoicePart,
	SeasonPart,
	SecondaryMaterialPart,
	SizePart,
	StatePart,
	SubCategoryPart,
	TypePart
} from './components'

const Form = ({
	setApiResponse,
	handleSubmit,
	onSubmit,
	control,
	register,
	errors,
	setValue,
	getValues,
	requiredFeatures,
	setRequiredFeatures,
	categoryOptions,
	refreshGetValues,
	setRefreshGetValues,
	subCategoryOptions,
	typeOptions,
	stateOptions,
	brandOptions,
	provisoireColors,
	seasonOptions,
	materialOptions,
	printOptions,
	sizeOptions,
	classOptions,
	locationState,
	productRef
}) => {
	return (
		<form
			className="justify-around flex-column w-75"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Row>
				<OrderPart
					control={control}
					setApiResponse={setApiResponse}
					setRequiredFeatures={setRequiredFeatures}
				/>
				<Col>
					<CategoryPart
						control={control}
						setValue={setValue}
						categoryOptions={categoryOptions}
						setRefreshGetValues={setRefreshGetValues}
					/>

					{getValues('category') &&
						getValues('category').value === 3 && (
							<SubCategoryPart
								control={control}
								subCategoryOptions={subCategoryOptions}
							/>
						)}

					<TypePart
						control={control}
						typeOptions={typeOptions}
						setRefreshGetValues={setRefreshGetValues}
					/>

					<StatePart control={control} stateOptions={stateOptions} />

					<DescriptionPart register={register} />

					<BrandPart control={control} brandOptions={brandOptions} />

					<ColorPart
						control={control}
						errors={errors}
						provisoireColors={provisoireColors}
						colorRules={requiredFeatures.color}
					/>

					<PrintPart
						control={control}
						errors={errors}
						printOptions={printOptions}
						printRules={requiredFeatures.print}
					/>

					<SeasonPart
						control={control}
						seasonOptions={seasonOptions}
					/>
				</Col>
				<Col>
					<MainMaterialPart
						control={control}
						errors={errors}
						materialOptions={materialOptions}
						materialRules={requiredFeatures.material}
					/>

					{getValues('mainMaterial') &&
						getValues('mainMaterial').value !== '' &&
						(!requiredFeatures.material ||
							requiredFeatures.material.visible) && (
							<SecondaryMaterialPart
								control={control}
								materialOptions={materialOptions}
								setRefreshGetValues={setRefreshGetValues}
							/>
						)}

					{getValues('secondaryMaterial') &&
						getValues('secondaryMaterial').value !== '' &&
						(!requiredFeatures.material ||
							requiredFeatures.material.visible) && (
							<OtherMaterialPart
								control={control}
								materialOptions={materialOptions}
							/>
						)}

					<SizePart
						control={control}
						errors={errors}
						getValues={getValues}
						sizeOptions={sizeOptions}
						sizeRules={requiredFeatures.size}
						refreshGetValues={refreshGetValues}
					/>

					<MeasuresPart
						requiredMeasures={'optionnal'}
						register={register}
						errors={errors}
						measuresRules={requiredFeatures.measures}
					/>

					<ActualOrVintagePart register={register} />

					<SapeeChoicePart register={register} />

					<ClassesCheckboxs
						register={register}
						classOptions={classOptions}
						classRules={requiredFeatures.classes}
					/>

					<PricePart register={register} />
				</Col>
			</Row>

			<FormButtons
				locationState={locationState}
				productRef={productRef}
			/>
		</form>
	)
}

export default Form
