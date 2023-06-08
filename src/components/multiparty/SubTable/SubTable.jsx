import './SubTable.scss'
import { Div, Table } from '../../templates'

const SubTable = ({ title, columns, datas, width }) => {
	return (
		<Div className={`subTable ${width ?? ''}`}>
			<Table title={title} columns={columns} datas={datas} />
		</Div>
	)
}

export default SubTable
