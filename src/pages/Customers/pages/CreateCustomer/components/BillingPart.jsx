import {
	Div,
	Input,
	Select,
	SubTitle,
	Switch
} from '../../../../../components/templates'
import { useState } from 'react'
import { REGNUM, REGSTRING } from '../../../../../utils/regex'

const BillingPart = ({ control, setValue, errors, tvas }) => {
	// * Déclaration:
	const [pricePerKiloEnabled, setPricePerKiloEnabled] = useState(false)

	return (
		<>
			<SubTitle label={'Facturation'} className={'text-center'} />

			<Div className={'justify-between align-center my-2 w-76'}>
				<Switch
					control={control}
					name={'sale_per_kilo'}
					label={'Vente au kilo ?:'}
					additionnalOnChange={(value) => {
						setPricePerKiloEnabled(value)
						if (!value) {
							setValue('price_kilo', null)
						}
					}}
				/>

				<Div className={'w-50'}>
					{pricePerKiloEnabled && (
						<Input
							type={'number'}
							control={control}
							name={'price_kilo'}
							className={'my-2'}
							label={'Prix au kilo (en €)'}
							setValue={setValue}
							rules={{
								pattern: {
									value: REGNUM.value,
									message: REGNUM.message
								}
							}}
							step={0.01}
							errors={errors}
						/>
					)}
				</Div>
			</Div>

			<Div className={'my-2 justify-between'}>
				<Input
					type={'number'}
					control={control}
					name={'per_commission'}
					className={'w-33'}
					label={'Commission (en %)'}
					rules={{
						pattern: {
							value: REGNUM.value,
							message: REGNUM.message
						}
					}}
					setValue={setValue}
					errors={errors}
					step={0.01}
				/>

				<Select
					control={control}
					name={'tvaType'}
					options={tvas.options}
					classNamePrefix={'w-33'}
					placeholder={'Sélectionner le type de tva'}
					rules={{
						required: 'Vous devez indiquer le type de Tva.'
					}}
					errors={errors}
				/>

				<Input
					control={control}
					name={'accounting_code'}
					className={'w-33 me-2'}
					label={'Code comptable'}
					rules={{
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message
						}
					}}
					errors={errors}
				/>
			</Div>
		</>
	)
}

export default BillingPart
