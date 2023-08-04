import DataTable from 'react-data-table-component'
import { useMemo } from 'react'
import { Button, Div, Img } from '../../templates'
import './Table.scss'
import { logoCSV } from '../../../assets'
import { useNavigate } from 'react-router-dom'

const Table = ({
	id,
	columns,
	datas,
	title,
	selectableRows,
	onSelectedRowsChange,
	clearSelectedRows,
	pagination,
	paginationResetDefaultPage,
	subHeader,
	subHeaderComponent,
	keysForCSV,
	csvName,
	actions,
	conditionalRowStyles,
	pointerOnHover,
	onRowClicked,
	expandableRows,
	expandableRowsComponent
}) => {
	// * Fonction de navigation:
	const navigate = useNavigate()

	// * Formatage de la pagination:
	const paginationComponentOptions = {
		rowsPerPageText: 'Ligne par page',
		rangeSeparatorText: 'sur',
		selectAllRowsItem: true,
		selectAllRowsItemText: 'Toutes'
	}

	// * Création Excel:
	const convertArrayOfObjectsToCSV = (array) => {
		let result

		const columnDelimiter = ';'
		const lineDelimiter = '\n'
		const keys = keysForCSV

		result = ''
		result += keys.join(columnDelimiter)
		result += lineDelimiter

		array.forEach((item) => {
			let ctr = 0
			keys.forEach((key) => {
				if (ctr > 0) result += columnDelimiter

				result += item[key]

				ctr++
			})
			result += lineDelimiter
		})

		return result
	}

	// * Téléchargement Excel:
	// Fonction de création du lien:
	const downloadCSV = (array) => {
		const link = document.createElement('a')
		let csv = convertArrayOfObjectsToCSV(array)
		if (csv == null) return

		const filename = csvName

		var universalBOM = '\uFEFF'
		link.setAttribute(
			'href',
			'data:text/csv;charset=utf-8,' +
				encodeURIComponent(universalBOM + csv)
		)
		link.setAttribute('download', filename)
		link.click()
	}

	// // Création du boutton:
	// const CreateButton = () => (
	// 	<Div className={'me-2'}>
	// 		<Button
	// 			className={'w-10 justify-align-center mb-1'}
	// 			onClick={() => navigate('/createCustomer')}
	// 		>
	// 			<Img src={logoCSV} className={'w-20 ms-1'} alt={'Créer'} />
	// 		</Button>
	// 	</Div>
	// )

	// Création du mémo:
	// const actionsMemo = useMemo(
	// 	() => <Export onExport={() => downloadCSV(datas)} />,
	// 	[datas]
	// )

	// * Création du header:
	const Title = ({ onExport }) => {
		return (
			<Div className={'justify-around'}>
				<Div>{title}</Div>
				<Div className={'me-2'}>
					<Button
						className={'w-10 justify-align-center mb-1'}
						onClick={(e) => onExport(e.target.value)}
					>
						<Img
							src={logoCSV}
							className={'w-60 ms-1'}
							alt={'Logo CSV'}
						/>
					</Button>
				</Div>
			</Div>
		)
	}

	return (
		<Div id={id} className={'table'}>
			<DataTable
				title={<Title />}
				columns={columns}
				data={datas}
				selectableRows={selectableRows}
				onSelectedRowsChange={onSelectedRowsChange}
				clearSelectedRows={clearSelectedRows}
				pagination={pagination}
				paginationComponentOptions={paginationComponentOptions}
				paginationResetDefaultPage={paginationResetDefaultPage}
				subHeader={subHeader}
				subHeaderComponent={subHeaderComponent}
				highlightOnHover
				actions={actions}
				conditionalRowStyles={conditionalRowStyles}
				pointerOnHover={pointerOnHover}
				onRowClicked={onRowClicked}
				expandableRows={expandableRows}
				expandableRowsComponent={expandableRowsComponent}
				dense
				fixed
			/>
		</Div>
	)
}

export default Table
