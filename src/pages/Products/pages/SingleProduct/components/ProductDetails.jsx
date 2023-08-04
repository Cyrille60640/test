import { Button, Div, Title } from '../../../../../components/templates'
import { useNavigate } from 'react-router-dom'

const ProductDetails = ({ product }) => {
	// * Déclarations:
	const navigate = useNavigate(),
		{
			id,
			ref,
			stock,
			origin_price,
			price,
			bar_code,
			brand,
			color,
			print,
			size,
			created_at,
			deleted_at,
			photos_uploaded_at,
			scan_at,
			selled_at,
			transferred_at,
			valided_at,
			length_in_cm,
			width_in_cm,
			third_measure_in_cm,
			mainProduct,
			sapee_choice
		} = product,
		{ item, quality, state, type } = mainProduct,
		{ category, season, style, typeGroup } = item,
		{ universal_size, sizeGuide } = size,
		table = [
			[
				['Identifiant', id],
				['En stock', stock ? 'Oui' : 'Non'],
				['Prix', price],
				["Prix d'origine", origin_price],
				['Code barre', bar_code],
				['Choix Sapée', sapee_choice],
				["Nom d'item", item.name],
				['Type', type.name],
				['Groupe de type', typeGroup.name],
				['Genre', category.name],
				['Couleur', color.name],
				['Imprimé', print.name],
				['Saison', season.name],
				['Marque', brand.name],
				['Qualité', quality.name]
			],
			[
				['Etat', state.name],
				['Style', style.name],
				['Taille', universal_size],
				['Longueur (cm)', length_in_cm],
				['Largeur (cm)', width_in_cm],
				['3ème mesure', third_measure_in_cm],
				['Guide de taille', sizeGuide.name],
				['Identifié le', created_at],
				['Photos uploadés le', photos_uploaded_at],
				['Scanné le', scan_at],
				['Vendu le', selled_at],
				['Transferré le', transferred_at],
				['Validé le', valided_at],
				['Supprimé le', deleted_at]
			]
		]

	return (
		<Div isABox>
			<Div className={'justify-between'}>
				<Title title={`Produit ${ref}:`} />
				<Div className={'justify-around'}>
					<Button
						label={'Modifier'}
						onClick={() => navigate(`/updateProduct/${ref}`)}
						tooltip={'Modifier'}
					/>
					<Button
						label={'Supprimer'}
						onClick={() => navigate(`/updateProduct/${ref}`)}
						tooltip={'Supprimer'}
					/>
					<Button
						label={'Retour'}
						onClick={() => navigate('/products')}
					/>
				</Div>
			</Div>
			<Div className={'justify-around align-items-center'}>
				{table.map((part) => {
					return (
						<table key={table.indexOf(part) + 1} className={'w-50'}>
							<tbody>
								{part.map((iteration) => {
									return (
										<tr
											key={`iteration-${
												table.indexOf(part) + 1
											}-${part.indexOf(iteration) + 1}`}
											className="border-bottom border-secondary"
										>
											<td className="pe-2">
												{iteration[0]}
											</td>
											<td className="ps-2">
												{iteration[1]}
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					)
				})}
			</Div>
		</Div>
	)
}

export default ProductDetails
