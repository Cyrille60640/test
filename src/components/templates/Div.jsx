import PropTypes from 'prop-types'

const Div = ({ id, className, children }) => {
	return (
		<div id={id} className={className}>
			{children}
		</div>
	)
}

Div.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string
}

export default Div
