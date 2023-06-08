import { Controller } from 'react-hook-form'
import '../../index.scss'

const FileInput = ({
	control,
	name,
	className,
	label,
	rules,
	additionnalOnChange
}) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, value } }) => (
				<label className="flex-column">
					<span>{label}</span>
					<input
						type={'file'}
						className={className}
						onChange={(e) => {
							let { value } = e.target
							onChange(value)
							if (additionnalOnChange) {
								additionnalOnChange(value)
							}
						}}
						value={value ?? ''}
					/>
				</label>
			)}
		/>
	)
}

export default FileInput
