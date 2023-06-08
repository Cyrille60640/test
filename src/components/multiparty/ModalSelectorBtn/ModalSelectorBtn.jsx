import './ModalSelectorBtn.css'

const ModalSelectorBtn = ({ item, handlePick }) => {
	return (
		<button
			type="button"
			className="modalSelectorBtn"
			style={{
				color: [
					'Gris',
					'Noir',
					'Anthracite',
					'Marine',
					'Métallisé'
				].includes(item.name)
					? 'white'
					: 'black',
				backgroundColor: item.hexadecimal_value
					? `#${item.hexadecimal_value}`
					: null
			}}
			onClick={() =>
				handlePick({
					id: item.value ?? item.id,
					name: item.label ?? item.name
				})
			}
		>
			{item.label ?? item.name}
		</button>
	)
}

export default ModalSelectorBtn
