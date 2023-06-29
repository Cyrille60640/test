import { useState, useEffect } from 'react'
import {
	Button,
	Div,
	Input,
	Paragraph,
	Select
} from '../../../../../../../components/templates'

const Part3 = ({ datas, control, getValues, errors, setPart }) => {
	const [leadings, setLeadings] = useState([])

	useEffect(() => {
		let values = getValues(),
			leadingsToState = []
		Object.keys(values).forEach((key) => {
			if (key.match(/leadingName/g)) {
				let options
				switch (values[`leadingTable-${key.split('-')[1]}`].label) {
					case 'Type':
						options = datas.types.options
						break

					case 'Qualité':
						options = datas.qualities.options
						break

					default:
						alert('Erreur datas non chargés')
				}

				leadingsToState.push({
					name: values[key],
					options
				})
			}
		})

		setLeadings(leadingsToState)
	}, [])

	return (
		<Div>
			{leadings.map((leading) => {
				let iteration = leadings.indexOf(leading) + 1
				return (
					<Div key={`leading-${iteration}`}>
						<Paragraph children={leading.name} />
						<Input
							control={control}
							name={`itemName-${iteration}`}
							label={'Appellation client'}
							errors={errors}
						/>
						<Select
							control={control}
							name={`itemValues-${iteration}`}
							options={leading.options}
							placeholder={"Sélectionner l'équivalence"}
							rules={{}}
							errors={errors}
							isMulti
						/>
					</Div>
				)
			})}
			<Button label={'Précédent'} onClick={() => setPart(2)} />
			<Button label={'Suivant'} onClick={() => setPart(4)} />
		</Div>
	)
}

export default Part3
