import { Div, Table } from '../../components/templates'

const Home = () => {
	return (
		<Div>
			<Table
				columns={[]}
				datas={[]}
				title={'Liste des 100 derniers produits identifiés'}
				keysForCSV={[]}
				csvName={'last100Products'}
			/>
			<Table
				columns={[]}
				datas={[]}
				title={'Liste des commandes en cours'}
				keysForCSV={[]}
				csvName={'salesInProgress'}
			/>
			<Div className={'justify-around'}>
				<Table
					columns={[]}
					datas={[]}
					title={'Produits à valider'}
					keysForCSV={[]}
					csvName={'productsToValidate'}
				/>
				<Table
					columns={[]}
					datas={[]}
					title={'Produits à transférer'}
					keysForCSV={[]}
					csvName={'productsToTransfer'}
				/>
			</Div>
		</Div>
	)
}

export default Home
