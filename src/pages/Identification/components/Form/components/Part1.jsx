import { useState, useEffect } from 'react'
import { Button, Div, Select } from '../../../../../components/templates'
import { Link } from 'react-router-dom'
import { checkPriceForIdentification } from '../../../../../services'

const Part1 = ({
	datas,
	setApiResponse,
	control,
	errors,
	setValue,
	getValues,
	setPart,
	setOrder
}) => {
	// * Déclarations:
	const { categories, customers, seasons, states, styles, types } = datas,
		[typeSelectDisabled, setTypeSelectDisabled] = useState(true),
		[typeOptions, setTypeOptions] = useState(types.options),
		tablesToSelect = [
			{
				name: 'order',
				options: customers.options,
				placeholder: 'un client'
			},
			{
				name: 'category',
				options: categories.options,
				placeholder: 'une catégorie'
			},
			{
				name: 'season',
				options: seasons.options,
				placeholder: 'une saison'
			},
			{
				name: 'state',
				options: states.options,
				placeholder: 'un état'
			},
			{
				name: 'type',
				options: typeOptions,
				placeholder: 'un type'
			},
			{
				name: 'style',
				options: styles.options,
				placeholder: 'un style'
			}
		]

	// * Récupération potentielle de certaines valeures et gestion des commandes:
	const [orderSelected, setOrderSelected] = useState(false),
		{ order } = getValues()

	useEffect(() => {
		if (order !== undefined) {
			setOrderSelected(true)
		}
	}, [])

	const handleOrderChange = (value) => {
		setOrderSelected(true)
		setOrder(value)
	}

	const handleCategoryChange = (value) => {
		let typeOptionsToState = []
		value.types.forEach((categoryType) => {
			types.options.forEach((typeOption) => {
				if (categoryType.id === typeOption.value) {
					typeOptionsToState.push(typeOption)
				}
			})
		})

		if (typeSelectDisabled) {
			setTypeSelectDisabled(false)
		}

		setTypeOptions(typeOptionsToState)
	}

	const checkStyle = (value) => {
		let styleIsAuthorized = false
		order.stylesQualities.forEach((styleQuality) => {
			if (value.value === styleQuality.id_style) {
				styleIsAuthorized = true
			}
		})
		if (!styleIsAuthorized) {
			setApiResponse({
				type: 'error',
				message: 'Style non authorisé..'
			})
		}

		return styleIsAuthorized
	}

	// * Fonction modularisée pour handle order et category changes:
	const handleChange = (tableName, value) => {
		if (tableName === 'order') {
			handleOrderChange(value)
		} else if (tableName === 'category') {
			handleCategoryChange(value)
		} else if (tableName === 'style') {
			checkStyle(value)
		}
	}

	// * Validation du formulaire:
	const handleValidation = () => {
		let values = getValues(),
			missingValues = false

		// On check que tout les champs sont bien remplis:
		tablesToSelect.forEach((table) => {
			let value = values[table.name]
			if (!value) {
				missingValues = true
			}
		})

		if (missingValues) {
			return setApiResponse({
				type: 'error',
				message: 'Formulaire incomplet..'
			})
		}

		// On check si le style est authorisé:
		if (!checkStyle(values.style)) return

		// On check également si un prix existe à ce stade:
		setPart(2)
		// // checkPriceForIdentification(values).then(() => {
		// // 	setPart(2)
		// // })
	}

	return (
		<Div className={'justify-align-center flex-column my-3 h-100'}>
			{tablesToSelect.map((table) => {
				return (
					<Div key={table.name} className={'my-2 w-50'}>
						<Select
							control={control}
							name={table.name}
							options={table.options}
							className={'text-center'}
							placeholder={`Sélectionner ${table.placeholder}`}
							rules={{
								required: `Vous devez renseigner ${table.placeholder}.`
							}}
							errors={errors}
							disabled={
								(!orderSelected && table.name !== 'order') ||
								(table.name === 'type' && typeSelectDisabled)
							}
							additionnalOnChange={(value) => {
								handleChange(table.name, value)
							}}
						/>
					</Div>
				)
			})}
			<Div className={'mt-4'}>
				<Link to={'/'}>
					<Button label={"Retour à l'accueil"} className={'me-2'} />
				</Link>
				<Button
					label={'Valider'}
					onClick={handleValidation}
					className={'ms-2'}
				/>
			</Div>
		</Div>
	)
}

export default Part1
