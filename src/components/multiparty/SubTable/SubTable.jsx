import './SubTable.scss'
import { Div, Table } from '../../templates'

const SubTable = ({ title, columns, datas, width, onRowClicked }) => {
	return (
		<Div className={`subTable ${width ?? ''}`}>
			<Table
				title={title}
				columns={columns}
				datas={datas}
				onRowClicked={(row) => onRowClicked(row.id)}
			/>
		</Div>
	)
}

export default SubTable
