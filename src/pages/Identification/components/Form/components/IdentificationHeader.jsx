import { Img } from '../../../../../components/templates'
import { logoLine } from '../../../../../assets'

const IdentificationHeader = ({ getValues, part }) => {
	let { order, type, category, subCategory, season, state, style } =
		getValues()

	if (part === 1) {
		return (
			<div className="justify-center mt-4">
				<Img src={logoLine} alt="Logo Sapée" className="w-25" />
			</div>
		)
	} else {
		return (
			<div className="align-center flex-column mt-4">
				<Img src={logoLine} alt="Logo Sapée" className="w-25" />
				<span className="text-center">Commande: {order.label}</span>
				<div className="d-flex">
					<span className="border me-2">{type.label}</span>
					<span className="border mx-2">{category.label}</span>
					{subCategory && (
						<span className="border mx-2">{subCategory.label}</span>
					)}
					<span className="border mx-2">{season.label}</span>
					<span className="border mx-2">{state.label}</span>
					<span className="border ms-2">{style.label}</span>
				</div>
			</div>
		)
	}
}

export default IdentificationHeader
