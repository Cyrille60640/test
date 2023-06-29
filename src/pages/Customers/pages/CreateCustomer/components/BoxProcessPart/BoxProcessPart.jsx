import { useState } from 'react'
import { Div } from '../../../../../../components/templates'
import { Part1, Part2, Part3, Part4 } from './components'

const BoxProcessPart = ({ datas, control, setValue, getValues, errors }) => {
	const [part, setPart] = useState(1)

	return (
		<Div>
			{part === 1 && (
				<Part1 control={control} errors={errors} setPart={setPart} />
			)}
			{part === 2 && (
				<Part2
					boxProcessTables={datas.boxProcessTables}
					control={control}
					errors={errors}
					setPart={setPart}
				/>
			)}
			{part === 3 && (
				<Part3
					datas={datas}
					control={control}
					getValues={getValues}
					errors={errors}
					setPart={setPart}
				/>
			)}
			{part === 4 && (
				<Part4
					control={control}
					setValue={setValue}
					errors={errors}
					setPart={setPart}
				/>
			)}
		</Div>
	)
}

export default BoxProcessPart
