import { useEffect } from 'react'
import {
	Button,
	Div,
	Input,
	Select
} from '../../../../../../../components/templates'
import { useState } from 'react'

const Part2 = ({ boxProcessTables, control, errors, setPart }) => {
	// * Déclarations:
	const [leadings, setLeadings] = useState([]),
		createNewLeading = () => {
			let iteration = leadings.length + 1
			setLeadings([
				...leadings,
				<Div key={`leading-${iteration}`}>
					<Input
						control={control}
						name={`leadingName-${iteration}`}
						label={'Appellation client'}
						errors={errors}
					/>
					<Select
						control={control}
						name={`leadingTable-${iteration}`}
						options={boxProcessTables.options}
						placeholder={"Sélectionner l'équivalence"}
						rules={{}}
						errors={errors}
					/>
				</Div>
			])
		}

	useEffect(() => {
		createNewLeading()
	}, [])

	return (
		<Div>
			Création des entêtes:
			<Div>{leadings}</Div>
			<Button
				label={'Ajouter un nouvel entête'}
				onClick={createNewLeading}
			/>
			<Button label={'Suivant'} onClick={() => setPart(3)} />
		</Div>
	)
}

export default Part2
