const DescriptionPart = ({ register }) => {
	return (
		<textarea
			className="ps-2"
			placeholder="Description"
			style={{ height: '100px', width: '100%' }}
			{...register('description')}
		></textarea>
	)
}

export default DescriptionPart
