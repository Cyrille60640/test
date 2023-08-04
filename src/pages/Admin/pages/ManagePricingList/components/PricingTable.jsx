import { Table } from '../../../../../components/templates'

const PricingTable = ({ pricing }) => {
	// Gestion des colonnes du tableau:
	let columns = [
		{
			name: 'Saison',
			selector: (row) => row.seasonName,
			maxWidth: '10%',
			center: true,
			sortable: true
		},
		{
			name: 'Actuel/Vintage',
			selector: (row) => (row.actualOrVintage ? 'Vintage' : 'Actuel'),
			maxWidth: '10%',
			center: true,
			sortable: true
		},
		{
			name: 'Catégorie',
			selector: (row) => row.categoryName,
			maxWidth: '10%',
			center: true,
			sortable: true
		},
		{
			name: 'Sous-catégorie',
			selector: (row) => row.subCategoryName,
			maxWidth: '10%',
			center: true,
			sortable: true
		},
		{
			name: 'Type',
			selector: (row) => row.typeName,
			maxWidth: '10%',
			center: true,
			sortable: true
		},
		{
			name: 'Etat',
			selector: (row) => row.stateName,
			maxWidth: '10%',
			center: true,
			sortable: true
		},
		{
			name: 'Qualité',
			selector: (row) => row.qualityName,
			maxWidth: '10%',
			center: true,
			sortable: true
		},
		{
			name: 'Pa',
			selector: (row) => row.pa_ht,
			maxWidth: '10%',
			center: true,
			sortable: true
		},
		{
			name: 'Pv',
			selector: (row) => row.pvc_ht,
			maxWidth: '10%',
			center: true,
			sortable: true
		}
	]

	const keysForCSV = [
		'seasonName',
		'actualOrVintage',
		'categoryName',
		'subCategoryName',
		'typeName',
		'stateName',
		'qualityName',
		'pa_ht'
	]

	return (
		<Table
			columns={columns}
			datas={pricing}
			pagination
			keysForCSV={keysForCSV}
			csvName="pricing"
		/>
	)
}

export default PricingTable
