import { useState } from 'react'
import { Select } from '../templates'
import { useEffect } from 'react'
// import { getSupportsForOneLine } from '../../services'
import { formateOptions } from '../../utils/functions'

const SupportsSelects = ({
	supportsLineOptions,
	supportsLineId,
	supportId,
	name,
	supportsLineName,
	control,
	setValue,
	getValues,
	watch,
	errors,
	setApiResponse,
	requiredInputsInIdentification,
	handleChange,
	otherFunctions,
	filtered
}) => {
	// * Déclarations:
	const [valuesGetInitialized, setValuesGetInitialized] = useState(false)

	// * Filtrage si nécessaire:
	const [filteredSupportsLines, setFilteredSupportsLines] =
		useState(supportsLineOptions)
	useEffect(() => {
		if (filtered) {
			let supportsLinesToState = filteredSupportsLines
			// supportsLinesToState = supportsLinesToState.filter(
			// 	(supportsLine) => {
			// 		return supportsLine.is_active
			// 	}
			// )
			setFilteredSupportsLines(supportsLinesToState)
		}
	}, [])

	// * Récupération des portants au changement d'une ligne:
	const [supports, setSupports] = useState([]),
		handleSupportsLineChange = async (value) => {
			setValue(name ?? 'support', null)
			setSupports(formateOptions(value.supports))
			// getSupportsForOneLine(value).then((data) => {
			// 	setValue(name ?? 'support', null)
			// 	let supportsToState = []
			// 	data.datas.forEach((support) => {
			// 		supportsToState.push({
			// 			value: support.id,
			// 			label: support.ref
			// 		})
			// 	})
			// 	setSupports(supportsToState)

			// 	// Page moveProducts:
			// 	if (otherFunctions) {
			// 		let functionsIndex = [
			// 			{
			// 				processus: 'setShowEndSupports',
			// 				valueToSet: false
			// 			},
			// 			{
			// 				processus: 'setShowValidationBtn',
			// 				valueToSet: false
			// 			},
			// 			{ processus: 'handleStartSupportsLineChange' },
			// 			{ processus: 'checkAllFields' },
			// 			{
			// 				processus: 'setProductsOnSupport',
			// 				valueToSet: []
			// 			},
			// 			{ processus: 'setSupportId' },
			// 			{ processus: 'setSupportSelected' },
			// 			{ processus: 'setDatasLoaded', valueToSet: false }
			// 		]
			// 		functionsIndex.forEach((fct) => {
			// 			let { processus, valueToSet } = fct,
			// 				exec = otherFunctions[processus]
			// 			if (exec) {
			// 				exec(valueToSet ?? null)
			// 			}
			// 		})
			// 	}
			// })
		}

	// * Récupération initiale possible des portants via hookForm:
	const setInitialValues = async (values) => {
			setValuesGetInitialized(true)
			let { supportsLine, support } = values
			await handleSupportsLineChange(supportsLine.value)
			setTimeout(() => {
				setValue('support', support)
				if (handleChange) {
					handleChange(support)
				}
			}, 50)
		},
		checkValuesInUseEffect = async (values) => {
			let { supportsLine, support } = values
			if (supportsLine && support) {
				setInitialValues(values)
			}
		}
	useEffect(() => {
		if (!valuesGetInitialized) {
			if (getValues) {
				const values = getValues()
				checkValuesInUseEffect(values)
			} else if (watch) {
				const subscription = watch((values) => {
					checkValuesInUseEffect(values).then(() => {
						subscription.unsubscribe()
					})
				})
			}
		}
	}, [getValues, watch])

	return (
		<>
			<div className="d-flex w-100 px-4">
				<div className="w-50">
					<Select
						id={supportsLineId}
						control={control}
						name={supportsLineName ?? 'supportsLine'}
						options={filteredSupportsLines}
						className={'text-center'}
						placeholder={'Sélectionner une ligne de portants'}
						rules={{
							required:
								'Vous devez renseigner une ligne de portants pour le produit.'
						}}
						errors={errors}
						additionnalOnChange={(value) => {
							handleSupportsLineChange(value)
						}}
					/>
				</div>
				<div className="w-50">
					<Select
						id={supportId}
						control={control}
						name={name ?? 'support'}
						options={supports}
						className={'text-center'}
						placeholder={'Sélectionner un portant'}
						rules={{
							required:
								'Vous devez renseigner un portant pour le produit.'
						}}
						errors={errors}
						additionnalOnChange={(value) => {
							if (handleChange) {
								handleChange(value)
							}
						}}
					/>
				</div>
			</div>
		</>
	)
}

export default SupportsSelects
