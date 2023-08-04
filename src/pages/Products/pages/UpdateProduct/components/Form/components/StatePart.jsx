import { Controller } from 'react-hook-form'
import { Select } from '../../../../../../../components/templates'

const StatePart = ({ control, stateOptions }) => {
	return (
		<Controller
			control={control}
			name={'state'}
			rules={{ required: true }}
			render={({ field: { onChange, value } }) => (
				<Select
					name={'state'}
					options={stateOptions}
					onChange={onChange}
					className="text-center my-3"
					value={value}
				/>
			)}
		/>
	)
}

export default StatePart
