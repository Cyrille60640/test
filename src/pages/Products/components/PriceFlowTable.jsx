import { Table } from '../../../components/templates'
import { useState, useEffect } from 'react'

const PriceFlowTable = ({ product, pricesHistory }) => {
	// * Déclarations:
	const [structureMounted, setStructureMounted] = useState(false),
		[pricesHistoryToTable, setPricesHistoryToTable] = useState([]),
		[columns, setColumns] = useState([])

	useEffect(() => {
		// * State Antibug asynchronicité sur maj des autres states:
		setStructureMounted(false)

		// * Ajout du produit dans les colonnes si page global:
		let columnsToState = []
		if (!product) {
			columnsToState.push({
				name: 'Ref Produit',
				selector: (row) => row.product.ref,
				width: '15%'
			})
		}

		columnsToState.push(
			{
				name: 'Méthode',
				selector: (row) => row.method,
				width: '15%'
			},
			{
				name: 'Changé le',
				selector: (row) => row.changed_at,
				width: '15%'
			},
			{
				name: 'Prix',
				selector: (row) => row.price,
				width: '15%'
			},
			{
				name: "Prix d'origine",
				selector: (row) => row.origin_price,
				width: '15%'
			},
			{
				name: 'Changement Manuel ?',
				selector: (row) => (row.is_Manual ? 'Oui' : 'Non'),
				width: '15%'
			},
			{
				name: 'Par',
				selector: (row) => `${row.user.lastname} ${row.user.firstname}`,
				width: '15%'
			}
		)
		setColumns(columnsToState)

		// * Filtrage des flux de stocks:
		setPricesHistoryToTable(
			!product ? pricesHistory : product.pricesHistory
		)

		// * Timeout Antibug asynchronicité sur maj des states:
		setTimeout(() => {
			setStructureMounted(true)
		}, 10)
	}, [product])

	return !structureMounted ? (
		false
	) : (
		<Table
			columns={columns}
			datas={pricesHistoryToTable}
			title={`Mouvements financiers ${
				!product ? 'globaux' : `du produit ${product.ref}`
			}:`}
			pagination
			paginationResetDefaultPage
			keysForCSV={[]}
			csvName={`priceHistory-${!product ? 'global' : product.ref}`}
		/>
	)
}

export default PriceFlowTable
