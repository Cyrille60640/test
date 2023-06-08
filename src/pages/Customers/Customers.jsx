import './Customers.scss'
import { Div } from '../../components/templates'
import {
	CustomersTable,
	IdentificationSettingsTable,
	ProductsInStockTable,
	QualitiesSettingsTable,
	StoreTable
} from './components'

const Customers = ({ customers }) => {
	return (
		<Div id={'customers'}>
			<Div className={'h-33'}>
				<CustomersTable customers={customers.datas} />
			</Div>
			<Div className={'d-flex h-33'}>
				<StoreTable />
				<ProductsInStockTable />
			</Div>
			<Div className={'d-flex h-33'}>
				<QualitiesSettingsTable />
				<IdentificationSettingsTable />
			</Div>
		</Div>
	)
}

export default Customers
