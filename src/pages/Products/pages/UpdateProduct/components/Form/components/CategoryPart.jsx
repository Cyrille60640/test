import { Controller } from 'react-hook-form'
import { Select } from '../../../../../../../components/templates'

const CategoryPart = ({
	control,
	setValue,
	categoryOptions,
	setRefreshGetValues
}) => {
	return (
		<Controller
			control={control}
			name={'category'}
			rules={{ required: true }}
			render={({ field: { onChange, value } }) => (
				<Select
					name={'category'}
					options={categoryOptions}
					onChange={(value) => {
						onChange(value)
						setValue('subCategory', undefined)
						setRefreshGetValues(true)
					}}
					className="text-center my-3"
					value={value}
				/>
			)}
		/>
	)
}

export default CategoryPart
