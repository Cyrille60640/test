import {
	AfterPrintModal,
	BoxModal,
	ColorsModal,
	MaterialsModal1,
	MaterialsModal2,
	MaterialsModal3,
	PrintsModal,
	UndefinedBrandModal
} from './components'

const IdentificationModals = ({
	datas,
	order,
	register,
	control,
	errors,
	setValue,
	getValues,
	setApiResponse,
	showConfirmationModal,
	setShowConfirmationModal,
	setLabelInfos,
	lastsLabelInfos,
	showUndefinedBrandModal,
	setShowUndefinedBrandModal,
	showColorsModal,
	setShowColorsModal,
	showPrintsModal,
	setShowPrintsModal,
	showMaterialsModal1,
	setShowMaterialsModal1,
	showMaterialsModal2,
	setShowMaterialsModal2,
	showMaterialsModal3,
	setShowMaterialsModal3,
	showBoxModal,
	setShowBoxModal,
	setBoxLabelInfos
}) => {
	// * Déclarations:
	const { colors, materials, prints, supportsLines } = datas

	return (
		<>
			<AfterPrintModal
				showConfirmationModal={showConfirmationModal}
				setShowConfirmationModal={setShowConfirmationModal}
				setLabelInfos={setLabelInfos}
				lastsLabelInfos={lastsLabelInfos}
			/>
			<UndefinedBrandModal
				showUndefinedBrandModal={showUndefinedBrandModal}
				setShowUndefinedBrandModal={setShowUndefinedBrandModal}
				setApiResponse={setApiResponse}
			/>
			<ColorsModal
				order={order}
				register={register}
				setValue={setValue}
				showColorsModal={showColorsModal}
				setShowColorsModal={setShowColorsModal}
				colorOptions={colors.datas}
				setShowPrintsModal={setShowPrintsModal}
				setShowMaterialsModal1={setShowMaterialsModal1}
			/>
			<PrintsModal
				order={order}
				register={register}
				setValue={setValue}
				showPrintsModal={showPrintsModal}
				setShowPrintsModal={setShowPrintsModal}
				printOptions={prints.options}
				setShowMaterialsModal1={setShowMaterialsModal1}
			/>
			<MaterialsModal1
				order={order}
				register={register}
				errors={errors}
				setValue={setValue}
				showMaterialsModal1={showMaterialsModal1}
				setShowMaterialsModal1={setShowMaterialsModal1}
				materialOptions={materials.options}
			/>
			<MaterialsModal2
				order={order}
				setValue={setValue}
				showMaterialsModal2={showMaterialsModal2}
				setShowMaterialsModal2={setShowMaterialsModal2}
				materialOptions={materials.options}
			/>
			<MaterialsModal3
				order={order}
				setValue={setValue}
				showMaterialsModal3={showMaterialsModal3}
				setShowMaterialsModal3={setShowMaterialsModal3}
				materialOptions={materials.options}
			/>
			<BoxModal
				showBoxModal={showBoxModal}
				setShowBoxModal={setShowBoxModal}
				setBoxLabelInfos={setBoxLabelInfos}
				control={control}
				setValue={setValue}
				getValues={getValues}
			/>
		</>
	)
}

export default IdentificationModals
