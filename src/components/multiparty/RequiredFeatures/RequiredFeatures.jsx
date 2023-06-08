import { useState } from 'react'
import './RequiredFeatures.scss'
import { Div, Switch } from '../../templates'

const RequiredFeatures = ({ control, setValue }) => {
	// * Déclarations:
	const [visibleValues, setVisibleValues] = useState({})

	return (
		<Div id={'requiredFeatures'}>
			<Div className={'requiredFeatures__row'}>
				<Div></Div>
				<Div>Visible:</Div>
				<Div>Obligatoire</Div>
			</Div>
			<Div className={'requiredFeatures__row'}>
				<Div>Attributs</Div>
				<Div>
					<Switch
						control={control}
						name={'visibleAttributes'}
						additionnalOnChange={(value) => {
							setVisibleValues({
								...visibleValues,
								attributes: value
							})
							if (!value) {
								setValue('requiredAttributes', false)
							}
						}}
					/>
				</Div>
				<Div>
					<Switch
						control={control}
						name={'requiredAttributes'}
						disabled={!visibleValues.attributes}
					/>
				</Div>
			</Div>
			<Div className={'requiredFeatures__row'}>
				<Div>Couleur</Div>
				<Div>
					<Switch
						control={control}
						name={'visibleColor'}
						additionnalOnChange={(value) => {
							setVisibleValues({
								...visibleValues,
								color: value
							})
							if (!value) {
								setValue('requiredColor', false)
							}
						}}
					/>
				</Div>
				<Div>
					<Switch
						control={control}
						name={'requiredColor'}
						disabled={!visibleValues.color}
					/>
				</Div>
			</Div>
			<Div className={'requiredFeatures__row'}>
				<Div>Imprimé</Div>
				<Div>
					<Switch
						control={control}
						name={'visiblePrint'}
						additionnalOnChange={(value) => {
							setVisibleValues({
								...visibleValues,
								print: value
							})
							if (!value) {
								setValue('requiredPrint', false)
							}
						}}
					/>
				</Div>
				<Div>
					<Switch
						control={control}
						name={'requiredPrint'}
						disabled={!visibleValues.print}
					/>
				</Div>
			</Div>
			<Div className={'requiredFeatures__row'}>
				<Div>Matière</Div>
				<Div>
					<Switch
						control={control}
						name={'visibleMaterial'}
						additionnalOnChange={(value) => {
							setVisibleValues({
								...visibleValues,
								material: value
							})
							if (!value) {
								setValue('requiredMaterial', false)
							}
						}}
					/>
				</Div>
				<Div>
					<Switch
						control={control}
						name={'requiredMaterial'}
						disabled={!visibleValues.material}
					/>
				</Div>
			</Div>
			<Div className={'requiredFeatures__row'}>
				<Div>Mesures</Div>
				<Div>
					<Switch
						control={control}
						name={'visibleMeasures'}
						additionnalOnChange={(value) => {
							setVisibleValues({
								...visibleValues,
								measures: value
							})
							if (!value) {
								setValue('requiredMeasures', false)
							}
						}}
					/>
				</Div>
				<Div>
					<Switch
						control={control}
						name={'requiredMeasures'}
						disabled={!visibleValues.measures}
					/>
				</Div>
			</Div>
			<Div className={'requiredFeatures__row'}>
				<Div>Taille</Div>
				<Div>
					<Switch
						control={control}
						name={'visibleSize'}
						additionnalOnChange={(value) => {
							setVisibleValues({
								...visibleValues,
								size: value
							})
							if (!value) {
								setValue('requiredSize', false)
							}
						}}
					/>
				</Div>
				<Div>
					<Switch
						control={control}
						name={'requiredSize'}
						disabled={!visibleValues.size}
					/>
				</Div>
			</Div>
		</Div>
	)
}

export default RequiredFeatures
