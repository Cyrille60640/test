import { useState, useEffect } from 'react'
import axios from 'axios'
import { returnApiResponseError } from '../../../../../utils/functions'

const TypePart = ({ setApiResponse }) => {
	const [measureTypes, setMeasureTypes] = useState([])
	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_DOMAIN + 'measureType')
			.then((res) => {
				setMeasureTypes(res.data.datas)
			})
			.catch((error) => {
				setApiResponse(returnApiResponseError(error))
			})
	}, [])

	return (
		<div>
			{measureTypes.map((type) => {
				return <span>{type.name}</span>
			})}
		</div>
	)
}

export default TypePart
