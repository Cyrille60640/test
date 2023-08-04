import { Controller } from 'react-hook-form'
import { Select } from '../../../../../../../components/templates'

const TypePart = ({ control, typeOptions, setRefreshGetValues }) => {
	return (
		<Controller
			control={control}
			name={'type'}
			rules={{ required: true }}
			render={({ field: { onChange, value } }) => (
				<Select
					name={'type'}
					options={typeOptions}
					onChange={(value) => {
						onChange(value)
						setRefreshGetValues(true)
					}}
					className="text-center my-3"
					value={value}
				/>
			)}
		/>
	)
}

export default TypePart
