import {
	BillingPart,
	IdentificationPart,
	IdentityPart,
	ProductsPart,
	StockPart
} from './components'
import { Button, Div, Separator } from '../../../../../../components/templates'
import { useState } from 'react'

const MainPart = ({
	control,
	setValue,
	errors,
	customersGroups,
	customersTypes,
	billindAndDeliveryAddressAreTheSame,
	setBillindAndDeliveryAddressAreTheSame,
	tvas,
	brands,
	qualities,
	boxProcessMode,
	setBoxProcessMode,
	navigate,
	handleEndingPart1,
	elementId
}) => {
	// * Déclarations:
	const [checkParameters, setCheckParameters] = useState(false)

	return (
		<>
			<IdentityPart
				control={control}
				setValue={setValue}
				errors={errors}
				datas={{ customersGroups, customersTypes }}
				billindAndDeliveryAddressAreTheSame={
					billindAndDeliveryAddressAreTheSame
				}
				setBillindAndDeliveryAddressAreTheSame={
					setBillindAndDeliveryAddressAreTheSame
				}
			/>

			<Separator />

			<BillingPart
				control={control}
				setValue={setValue}
				errors={errors}
				tvas={tvas}
			/>

			<Separator />

			<StockPart control={control} />

			<Separator />

			<ProductsPart
				control={control}
				errors={errors}
				datas={{ brands, qualities }}
				setCheckParameters={setCheckParameters}
				boxProcessMode={boxProcessMode}
				setBoxProcessMode={setBoxProcessMode}
			/>

			<Separator />

			<IdentificationPart
				control={control}
				setValue={setValue}
				checkParameters={checkParameters}
			/>

			<Div className={'justify-center mt-3'}>
				<Button label={'Retour'} onClick={() => navigate('/')} />
				<Button
					onClick={handleEndingPart1}
					className={'ms-3'}
					label={elementId === undefined ? 'Ajouter' : 'Modifier'}
				/>
			</Div>
		</>
	)
}

export default MainPart
