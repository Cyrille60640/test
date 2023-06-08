import { SubTable } from '../../../components/multiparty'

const ProductsInStockTable = () => {
	const columns = [
			{
				name: 'Nom',
				selector: (row) => row.name
			}
		],
		customers = [
			{ name: 'YOLO' },
			{ name: 'YOLO2' },
			{ name: 'YOLO3' },
			{ name: 'YOLO3' },
			{ name: 'YOLO' },
			{ name: 'YOLO2' },
			{ name: 'YOLO3' },
			{ name: 'YOLO3' }
		]

	return (
		<SubTable
			title={'Articles en stock'}
			columns={columns}
			datas={customers}
			width={'w-67'}
		/>
	)
}

export default ProductsInStockTable
