import { Controller } from 'react-hook-form'
import { Select } from '../../../../../../../components/templates'

const SeasonPart = ({ control, seasonOptions }) => {
	return (
		<Controller
			control={control}
			name={'season'}
			rules={{ required: true }}
			render={({ field: { onChange, value } }) => (
				<Select
					name={'season'}
					options={seasonOptions}
					onChange={onChange}
					className="text-center my-3"
					value={value}
				/>
			)}
		/>
	)
}

export default SeasonPart
