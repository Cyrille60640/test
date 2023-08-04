import { Box, Button } from '../../../../../components/templates'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { returnApiResponseError } from '../../../../../util/functions'

const Import = ({ pricingListId, setApiResponse }) => {
	// Déclaration hook form:
	const {
		register,
		handleSubmit,
		setValue
		// formState: { errors }
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		shouldFocusError: true
	})

	// Soumission:
	const onSubmit = (data) => {
		let formData = new FormData()
		Object.keys(data).forEach((key) => {
			formData.append(key, data[key][0])
		})

		axios
			.post(
				`${process.env.REACT_APP_API_DOMAIN}pricingList/importExcel/${pricingListId}`,
				formData
			)
			.then((res) => {
				setValue('excel', null)
				setApiResponse({
					type: 'success',
					message: res.data.message
				})
			})
			.catch((error) => {
				setApiResponse(returnApiResponseError(error))
			})
	}

	return (
		<Box className="my-2 align-center flex-column">
			<h6 className="mb-0 text-decoration-underline">
				Importer par Excel:
			</h6>
			<a
				href={process.env.REACT_APP_API_DOMAIN + 'excelImport.xlsx'}
				className="my-1"
				download
			>
				<Button label="Obtenir un template" />
			</a>
			<form
				encType="multipart/form-data"
				className="d-flex flex-column align-center"
				onSubmit={handleSubmit(onSubmit)}
			>
				<input type="file" className="my-1" {...register('excel')} />
				<Button type="submit" label="Valider" />
			</form>
		</Box>
	)
}

export default Import
