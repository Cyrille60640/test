import PropTypes from 'prop-types'
import './Title.scss'

const Title = ({ children }) => {
	return <h2>{children}</h2>
}

Title.propTypes = {
	children: PropTypes.string
}

export default Title
