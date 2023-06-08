import { Checkbox as MuiCheckbox } from '@mui/material'
import { Div } from '../templates'

const Checkbox = ({ label, onChange }) => {
	return (
		<Div>
			<MuiCheckbox onChange={onChange} /> {label}
		</Div>
	)
}

export default Checkbox
