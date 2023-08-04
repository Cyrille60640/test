import React from 'react'
import { Div, Select, Title } from '../../../components/templates'
import { useForm } from 'react-hook-form'

const CreateSale = ({ datas }) => {
	// * Déclarations:
	const { customers, saleTypes } = datas,
		{
			control,
			formState: { errors }
		} = useForm()

	return (
		<Div>
			<Title title={"Création d'une commande"} />
			<Select
				control={control}
				name={'customer'}
				options={customers.options}
				placeholder={'Sélectionner un client'}
				errors={errors}
			/>
			<Select
				control={control}
				name={'saleType'}
				options={[]}
				placeholder={'Sélectionner un type de vente'}
				errors={errors}
			/>
		</Div>
	)
}

export default CreateSale
