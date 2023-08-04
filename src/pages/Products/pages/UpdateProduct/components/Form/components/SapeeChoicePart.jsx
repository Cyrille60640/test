const SapeeChoicePart = ({ register }) => {
	return (
		<div className="justify-center">
			<label className="my-2">
				Choix Sapée ?:
				<input
					type="checkbox"
					className="ms-1"
					{...register('sapeeChoice')}
				/>
			</label>
		</div>
	)
}

export default SapeeChoicePart
