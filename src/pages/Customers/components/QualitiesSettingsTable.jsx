import { SubTable } from '../../../components/multiparty'

const QualitiesSettingsTable = () => {
	const columns = [
			{
				name: 'Nom',
				selector: (row) => row.name
			},
			{
				name: 'Nom',
				selector: (row) => row.name
			},
			{
				name: 'Nom',
				selector: (row) => row.name
			},
			{
				name: 'Nom',
				selector: (row) => row.name
			},
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
			title={'Paramêtres par qualité'}
			columns={columns}
			datas={customers}
			width={'w-33'}
		/>
	)
}

export default QualitiesSettingsTable
