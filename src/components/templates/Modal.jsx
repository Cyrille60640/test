import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle
} from '@mui/material'

const Modal = ({ open, setOpen, content }) => {
	const { header, body, footer } = content

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>{header}</DialogTitle>
			<DialogContent>{body}</DialogContent>
			<DialogActions>{footer}</DialogActions>
		</Dialog>
	)
}

export default Modal
