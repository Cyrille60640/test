import { Table } from '../../../components/templates'
import { useState, useEffect } from 'react'

const StockFlowTable = ({ product, stockFlows }) => {
	// * Déclarations:
	const [structureMounted, setStructureMounted] = useState(false),
		[stockFlowsToTable, setStockFlowsToTable] = useState([]),
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
				name: 'Type de Flow',
				selector: (row) => row.type_flow,
				width: '15%'
			},
			{
				name: 'Entrée/Sortie',
				selector: (row) => (row.in === 1 ? 'Entrée' : 'Sortie'),
				width: '15%'
			},
			{
				name: 'Stock',
				selector: (row) => row.stock.name,
				width: '15%'
			},
			{
				name: 'Carton/Support',
				selector: (row) =>
					row.box
						? row.box.ref
						: `${row.support.supportsLine.ref} ${row.support.ref}`,
				width: '15%'
			},
			{
				name: 'Distributeur',
				selector: (row) => row.customer.social_reason,
				width: '15%'
			},
			{
				name: 'Ref Vente',
				selector: (row) => row.sale.ref_sylius,
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
		setStockFlowsToTable(!product ? stockFlows : product.stockFlows)

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
			datas={stockFlowsToTable}
			title={`Flux de stock ${
				!product ? 'Global' : `du produit ${product.ref}`
			}:`}
			pagination
			paginationResetDefaultPage
			keysForCSV={[]}
			csvName={`stockFlow-${!product ? 'global' : product.ref}`}
		/>
	)
}

export default StockFlowTable
