import { IdentificationHeader, Part1, Part2, Part3 } from './components'
import { Form as TForm } from '../../../../components/templates'

const Form = ({
	datas,
	part,
	setPart,
	handleSubmit,
	onSubmit,
	apiResponse,
	setApiResponse,
	order,
	setOrder,
	productDatas,
	setProductDatas,
	control,
	register,
	errors,
	setValue,
	getValues,
	setShowUndefinedBrandModal,
	setShowColorsModal,
	setShowPrintsModal,
	setShowMaterialsModal1,
	setShowMaterialsModal2,
	setShowMaterialsModal3,
	setNumberOfAttributes,
	resetFields,
	setShowBoxModal
}) => {
	return (
		<>
			<TForm
				id="doSortOrder"
				className="d-flex flex-column w-100 h-100"
				onSubmit={handleSubmit(onSubmit)}
			>
				<IdentificationHeader getValues={getValues} part={part} />
				{part === 1 && (
					<Part1
						datas={datas}
						setApiResponse={setApiResponse}
						control={control}
						errors={errors}
						setValue={setValue}
						getValues={getValues}
						setPart={setPart}
						setOrder={setOrder}
					/>
				)}
				{part === 2 && (
					<Part2
						control={control}
						boxs={datas.boxs}
						setValue={setValue}
						getValues={getValues}
						errors={errors}
						setApiResponse={setApiResponse}
						setPart={setPart}
					/>
				)}
				{part === 3 && (
					<Part3
						datas={datas}
						order={order}
						register={register}
						control={control}
						setValue={setValue}
						getValues={getValues}
						errors={errors}
						setApiResponse={setApiResponse}
						setShowUndefinedBrandModal={setShowUndefinedBrandModal}
						productDatas={productDatas}
						setProductDatas={setProductDatas}
						setShowColorsModal={setShowColorsModal}
						setShowPrintsModal={setShowPrintsModal}
						setShowMaterialsModal1={setShowMaterialsModal1}
						setShowMaterialsModal2={setShowMaterialsModal2}
						setShowMaterialsModal3={setShowMaterialsModal3}
						setNumberOfAttributes={setNumberOfAttributes}
						setPart={setPart}
						resetFields={resetFields}
						setShowBoxModal={setShowBoxModal}
					/>
				)}
			</TForm>
		</>
	)
}

export default Form
