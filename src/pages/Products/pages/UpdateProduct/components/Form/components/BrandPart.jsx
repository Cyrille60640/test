import { Controller } from 'react-hook-form'
import { Select } from '../../../../../../../components/templates'

const BrandPart = ({ control, brandOptions }) => {
	return (
		<Controller
			control={control}
			name={'brand'}
			rules={{ required: true }}
			render={({ field: { onChange, value } }) => (
				<Select
					name={'brand'}
					options={brandOptions}
					onChange={onChange}
					placeholder={'Sélectionner une marque'}
					className="text-center my-3"
					value={value}
				/>
			)}
		/>
	)
}

export default BrandPart
