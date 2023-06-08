import { Controller } from 'react-hook-form'
import { FormControl, FormHelperText } from '@mui/material'
import RSelect from 'react-select'
import PropTypes from 'prop-types'
import './Select.scss'

const Select = ({
	control,
	id,
	name,
	options,
	className,
	classNamePrefix,
	placeholder,
	rules,
	errors,
	isMulti,
	disabled,
	additionnalOnChange,
	styles
}) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, value } }) => (
				<FormControl className={className}>
					<RSelect
						inputId={id}
						options={options}
						name={name}
						className={className}
						classNamePrefix={'select ' + classNamePrefix}
						placeholder={placeholder}
						value={value}
						onChange={(value) => {
							onChange(value)
							if (additionnalOnChange) {
								additionnalOnChange(value)
							}
						}}
						isMulti={isMulti}
						isDisabled={disabled}
						menuPortalTarget={document.body}
						styles={{
							...styles,
							menuPortal: (base) => ({ ...base, zIndex: 9999 })
						}}
					/>
					{errors[name] && (
						<FormHelperText error={true}>
							{errors[name].message}
						</FormHelperText>
					)}
				</FormControl>
			)}
		/>
	)
}

Select.propTypes = {
	control: PropTypes.object,
	id: PropTypes.string,
	name: PropTypes.string,
	options: PropTypes.array,
	className: PropTypes.string,
	classNamePrefix: PropTypes.string,
	placeholder: PropTypes.string,
	rules: PropTypes.object,
	errors: PropTypes.object,
	isMulti: PropTypes.bool,
	disabled: PropTypes.bool,
	additionnalOnChange: PropTypes.func,
	styles: PropTypes.object
}

export default Select
