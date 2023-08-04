import { Controller } from 'react-hook-form'
import { Select } from '../../../../../../../components/templates'

const OtherMaterialPart = ({ control, materialOptions }) => {
	return (
		<Controller
			control={control}
			name={'otherMaterial'}
			render={({ field: { onChange, value } }) => (
				<Select
					name={'otherMaterial'}
					options={materialOptions}
					onChange={onChange}
					placeholder={'Sélectionner une autre matière'}
					className="text-center my-3"
					value={value}
				/>
			)}
		/>
	)
}

export default OtherMaterialPart
