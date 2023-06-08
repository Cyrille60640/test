import { Div } from '../../../../../../components/templates'
import { SupportsSelects } from '../../../../../../components/multiparty'
import {
	AttributesPart,
	BrandPart,
	ClassesPart,
	ColorAndPrintPart,
	IdentificationButtons,
	MaterialsButtons,
	MeasuresPart,
	SapeeChoicePart,
	SizePart
} from './components'

const Part3 = ({
	datas,
	order,
	register,
	control,
	setValue,
	getValues,
	errors,
	setApiResponse,
	setShowUndefinedBrandModal,
	productDatas,
	setProductDatas,
	setShowColorsModal,
	setShowPrintsModal,
	setShowMaterialsModal1,
	setShowMaterialsModal2,
	setShowMaterialsModal3,
	setNumberOfAttributes,
	setPart,
	resetFields,
	setShowBoxModal
}) => {
	// * Déclarations:
	const { attributes, brands, classes, sizes, subAttributes, supportsLines } =
		datas

	return (
		<Div className="justify-around align-items-center w-100 h-100">
			<Div className="d-flex flex-column w-50 mx-4">
				<span id="requiredInputsLegend">*Champs obligatoires</span>
				<BrandPart
					brands={brands}
					control={control}
					errors={errors}
					setValue={setValue}
					getValues={getValues}
					setShowUndefinedBrandModal={setShowUndefinedBrandModal}
					setProductDatas={setProductDatas}
					setApiResponse={setApiResponse}
					order={order}
				/>
				<ColorAndPrintPart
					order={order}
					errors={errors}
					setShowColorsModal={setShowColorsModal}
					setShowPrintsModal={setShowPrintsModal}
				/>
				<MaterialsButtons
					order={order}
					register={register}
					errors={errors}
					setShowMaterialsModal1={setShowMaterialsModal1}
					setShowMaterialsModal2={setShowMaterialsModal2}
					setShowMaterialsModal3={setShowMaterialsModal3}
				/>
				<SizePart
					sizes={sizes}
					order={order}
					control={control}
					errors={errors}
					getValues={getValues}
				/>
				<MeasuresPart
					order={order}
					errors={errors}
					register={register}
				/>
				<AttributesPart
					order={order}
					attributes={attributes}
					subAttributes={subAttributes}
					setNumberOfAttributes={setNumberOfAttributes}
					control={control}
					errors={errors}
					getValues={getValues}
				/>
				<SapeeChoicePart
					order={order}
					register={register}
					productDatas={productDatas}
				/>
				<ClassesPart
					order={order}
					classOptions={classes.datas}
					register={register}
				/>
				{/* <SupportsSelects
					control={control}
					setValue={setValue}
					getValues={getValues}
					errors={errors}
					supportsLineOptions={supportsLines.options}
					setApiResponse={setApiResponse}
					requiredInputsInIdentification
					filtered
				/> */}
			</Div>
			<IdentificationButtons
				setPart={setPart}
				resetFields={resetFields}
				setShowBoxModal={setShowBoxModal}
			/>
		</Div>
	)
}

export default Part3
