import { Div, SubTitle, Switch } from '../../../../../components/templates'
import { useState } from 'react'
import { RequiredFeatures } from '../../../../../components/multiparty'

const IdentificationPart = ({ control, setValue, checkParameters }) => {
	const [identificationEnabled, setIdentificationEnabled] = useState(false)

	return (
		<>
			<SubTitle label={'Identification'} className={'text-center'} />

			<Div className={'justify-around'}>
				<Switch
					control={control}
					name={'identification'}
					label={'Identification ?:'}
					className={'my-2'}
					additionnalOnChange={setIdentificationEnabled}
				/>

				{identificationEnabled && (
					<>
						<Switch
							control={control}
							name={'ean13_print'}
							label={"Ean13 sur l'étiquette ?:"}
							className={'my-2'}
						/>
						<Switch
							control={control}
							name={'price_print'}
							label={"Prix sur l'étiquette ?:"}
							className={'my-2'}
						/>
					</>
				)}
			</Div>
			{identificationEnabled && checkParameters && (
				<RequiredFeatures control={control} setValue={setValue} />
			)}
		</>
	)
}

export default IdentificationPart
