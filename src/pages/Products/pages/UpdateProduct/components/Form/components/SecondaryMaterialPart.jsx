import { Controller } from 'react-hook-form'
import { Select } from '../../../../../../../components/templates'

const SecondaryMaterialPart = ({
	control,
	materialOptions,
	setRefreshGetValues
}) => {
	return (
		<Controller
			control={control}
			name={'secondaryMaterial'}
			render={({ field: { onChange, value } }) => (
				<Select
					name={'secondaryMaterial'}
					options={materialOptions}
					onChange={(value) => {
						onChange(value)
						setRefreshGetValues(true)
					}}
					placeholder="Sélectionner une matière secondaire"
					className="text-center my-3"
					value={value}
				/>
			)}
		/>
	)
}

export default SecondaryMaterialPart
