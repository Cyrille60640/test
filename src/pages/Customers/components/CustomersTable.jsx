import { SubTable } from '../../../components/multiparty'

const CustomersTable = ({ customers, setSelectedCustomer }) => {
	// * Déclararations:
	const columns = [
		{
			name: 'Raison sociale',
			selector: (row) => row.social_reason
		}
	]

	return (
		<SubTable
			title={'Liste des distributeurs'}
			columns={columns}
			datas={customers}
			onRowClicked={() => setSelectedCustomer()}
		/>
	)
}

export default CustomersTable
