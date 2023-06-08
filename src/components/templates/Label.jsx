const Label = ({ children, id, htmlFor, className, onClick }) => {
	return (
		<label
			id={id}
			htmlFor={htmlFor}
			className={className}
			onClick={onClick}
		>
			{children}
		</label>
	)
}

export default Label
