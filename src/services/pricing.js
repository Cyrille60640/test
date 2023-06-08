import axios from 'axios'
const env = process.env.REACT_APP_API_DOMAIN,
	url = `${env}pricing/`

const getPriceForIdentification = async (values) => {
	// * Construction du body:
	let { category, order, quality, season, state, style, type } = values,
		body = {
			id_category: category.value,
			id_customer: order.value,
			id_quality: quality.id,
			id_season: season.value,
			id_style: style.value,
			id_state: state.value,
			id_type: type.value,
			id_type_group: 1
		}

	// * Call:
	return axios.post(`${url}getForIdentification`, body).then((res) => {
		return res.data.datas
	})
}

export { getPriceForIdentification }
