import { Controller } from 'react-hook-form'
import { Select } from '../../../../../../../components/templates'

const SubCategoryPart = ({ control, subCategoryOptions }) => {
	return (
		<Controller
			control={control}
			name={'subCategory'}
			rules={{ required: true }}
			render={({ field: { onChange, value } }) => (
				<Select
					name={'subCategory'}
					options={subCategoryOptions}
					onChange={onChange}
					className="text-center my-3"
					value={value}
				/>
			)}
		/>
	)
}

export default SubCategoryPart
