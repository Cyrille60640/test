import { useState } from 'react'
import { Div, SubTitle, Switch } from '../../../../../components/templates'

const StockPart = ({ control }) => {
	// * Déclaration:
	const [stockEnabled, setStockEnabled] = useState(false)

	return (
		<>
			<SubTitle label={'Stock'} className={'text-center'} />

			<Div className={'justify-between align-center my-2 w-76'}>
				<Switch
					control={control}
					name={'stock'}
					label={'Stock ?:'}
					additionnalOnChange={(value) => {
						setStockEnabled(value)
						// if (!value) {
						//     setValue('price_kilo', null)
						// }
					}}
				/>
				<Div className={'w-50'}>
					{stockEnabled && 'MODULE GESTION STOCK'}
				</Div>
			</Div>
		</>
	)
}

export default StockPart
