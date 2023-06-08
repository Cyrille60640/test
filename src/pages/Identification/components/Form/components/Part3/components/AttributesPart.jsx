import { useEffect } from 'react'
import { Select } from '../../../../../../../components/templates'

const AttributesPart = ({
	order,
	attributes,
	subAttributes,
	setNumberOfAttributes,
	control,
	errors,
	getValues
}) => {
	let { attributes: attributesRules } = order.requiredFeatures

	const generateAttributes = async () => {
		if (!attributesRules || attributesRules.visible) {
			if (document.querySelector('#attributesList').innerHTML !== '') {
				return
			}

			// Récupération des attributs disponibles pour l'article:
			let values = getValues(),
				{ attributes: attributesForThisType } = values.type

			if (attributesForThisType.length === 0) {
				setNumberOfAttributes(0)
			} else {
				// document.querySelector(
				// 	'#attributesBtn'
				// ).disabled = false
				let numberOfAttributesToState = 0

				attributes.options.forEach((attribute) => {
					let { value, label } = attribute
					attributesForThisType.forEach((attribute2) => {
						if (attribute.value === attribute2.id) {
							numberOfAttributesToState++

							document.querySelector(
								'#attributesList'
							).innerHTML += `<label htmlFor="attribute${numberOfAttributesToState}" style="margin: 0 1em" />
														<select ${
															(!attributesRules ||
																attributesRules.required) &&
															'required'
														} id="attribute${numberOfAttributesToState}" data-ref=${value}>
															<option value="">${label}</option>
														</select>
													</label>`

							attribute.subAttributes.forEach((subAttribute) => {
								let { id, name } = subAttribute
								document.querySelector(
									'#attribute' + numberOfAttributesToState
								).innerHTML += `<option value="${id}">${name}</option>`
							})

							// return (
							// 	<Select
							// 		control={control}
							// 		id={`attribute${numberOfAttributesToState}`}
							// 		name={`attribute${numberOfAttributesToState}`}
							// 		options={attribute.subAttributes}
							// 		placeholder={attribute.label}
							// 		rules={null}
							// 		errors={errors}
							// 	/>
							// )
						}
					})
				})

				setNumberOfAttributes(numberOfAttributesToState)
			}
		}
	}

	useEffect(() => {
		if (!attributesRules || attributesRules.visible) {
			generateAttributes()
		}
	}, [])

	if (!(!attributesRules || attributesRules.visible)) {
		return false
	} else {
		return (
			<label htmlFor="attributesList" className="mt-3">
				Attributs:
				<div id="attributesList" className="justify-center"></div>
			</label>
		)
	}
}

export default AttributesPart
