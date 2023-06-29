import { Button, Div, Input } from '../../../../../../../components/templates'

const Part4 = ({ control, setValue, errors, setPart }) => {
	return (
		<Div>
			<Div>
				<Input
					control={control}
					name={'buy_price'}
					type={'number'}
					label={"Prix d'achat"}
					errors={errors}
					setValue={setValue}
					step={0.01}
				/>
				<Input
					control={control}
					name={'sell_price'}
					type={'number'}
					label={'Prix de vente'}
					errors={errors}
					setValue={setValue}
					step={0.01}
				/>
				<Input
					control={control}
					name={'products_count'}
					type={'number'}
					label={'Nombre de pièces par carton'}
					errors={errors}
					setValue={setValue}
					step={0.01}
				/>
			</Div>
			<Button label={'Précédent'} onClick={() => setPart(3)} />
			<Button label={'Conclure'} onClick={() => alert('conclusion')} />
		</Div>
	)
}

export default Part4
