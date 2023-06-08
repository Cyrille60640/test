import { SubTable } from '../../../components/multiparty'

const StoreTable = () => {
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
			title={'Magasin'}
			columns={columns}
			datas={customers}
			width={'w-33'}
		/>
	)
}

export default StoreTable
