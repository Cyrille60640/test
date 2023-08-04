import './Customers.scss'
import { Div } from '../../components/templates'
import { useState } from 'react'
import {
	CustomersTable,
	IdentificationSettingsTable,
	ProductsInStockTable,
	QualitiesSettingsTable,
	StoreTable
} from './components'

const Customers = ({ customers }) => {
	const [selectedCustomer, setSelectedCustomer] = useState()

	return (
		<Div id={'customers'}>
			<Div className={!selectedCustomer ? 'h-33' : 'h-100'}>
				<CustomersTable
					customers={customers.datas}
					setSelectedCustomer={setSelectedCustomer}
				/>
			</Div>
			{selectedCustomer && (
				<Div>
					<Div className={'d-flex h-33'}>
						<StoreTable />
						<ProductsInStockTable />
					</Div>
					<Div className={'d-flex h-33'}>
						<QualitiesSettingsTable />
						<IdentificationSettingsTable />
					</Div>
				</Div>
			)}
		</Div>
	)
}

export default Customers
