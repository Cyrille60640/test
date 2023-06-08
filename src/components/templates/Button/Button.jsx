import PropTypes from 'prop-types'
import './Button.scss'
import { useState } from 'react'

const Button = ({
	id,
	className,
	type,
	label,
	children,
	toggle,
	target,
	data,
	onClick,
	disabled
}) => {
	const [borderColor, setBorderColor] = useState('#CED4DA')

	return (
		<button
			id={id ?? data}
			type={type ?? 'button'}
			disabled={disabled}
			className={`button ${className ?? ''}`}
			data-bs-toogle={toggle}
			data-bs-target={target}
			onClick={onClick}
			style={{ border: '1px solid ' + borderColor }}
			onMouseOver={() => setBorderColor('#B1C91D')}
			onMouseOut={() => setBorderColor('#CED4DA')}
		>
			{children ?? label}
		</button>
	)
}

Button.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	toggle: PropTypes.string,
	target: PropTypes.string,
	data: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool
}

export default Button
