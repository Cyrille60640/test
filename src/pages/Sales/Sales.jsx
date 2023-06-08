import './Sales.scss'
import { Div, Table } from '../../components/templates'

const Sales = ({ sales }) => {
	// * Déclarations:
	const setOneSale = () => {
		alert('YO')
	}

	return (
		<Div className={'justify-around flex-column align-center'}>
			<Table
				columns={[]}
				datas={sales}
				title={'Ventes'}
				pagination
				paginationResetDefaultPage
				keysForCSV={[]}
				csvName={'sales'}
				onRowClicked={setOneSale}
			/>
			<Div>Table</Div>
			<Div>Détail</Div>
		</Div>
	)
}

export default Sales
