const ActualOrVintagePart = ({ register }) => {
	return (
		<div className="justify-around">
			<label htmlFor="classic">
				Classique:
				<input
					id="classic"
					type="radio"
					value={0}
					className="ms-1"
					{...register('classicOrRetro')}
				/>
			</label>
			<label>
				Retro:
				<input
					id="retro"
					type="radio"
					value={1}
					className="ms-1"
					{...register('classicOrRetro')}
				/>
			</label>
		</div>
	)
}

export default ActualOrVintagePart
