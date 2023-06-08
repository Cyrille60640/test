import { Stack, Switch as MuiSwitch, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { Div } from '../../templates'
import './Switch.scss'

const Switch = ({
	control,
	name,
	label,
	className,
	additionnalOnChange,
	disabled
}) => {
	return (
		<Div className={`switch ${className}`}>
			<Div className={'switch__label'}>{label}</Div>
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value } }) => (
					<Stack direction="row" spacing={1} alignItems="center">
						<Typography>Non</Typography>
						<MuiSwitch
							checked={value ?? false}
							onChange={(e) => {
								let { checked } = e.target
								onChange(checked)
								if (additionnalOnChange) {
									additionnalOnChange(checked)
								}
							}}
							disabled={disabled}
						/>
						<Typography>Oui</Typography>
					</Stack>
				)}
			/>
		</Div>
	)
}

export default Switch
