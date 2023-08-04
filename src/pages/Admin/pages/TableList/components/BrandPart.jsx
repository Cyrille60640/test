import { useState } from 'react'
import { Button } from '../../../../../components/templates'
import { Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { returnApiResponseError } from '../../../../../util/functions'

const BrandPart = ({ setApiResponse }) => {
	// State Modal:
	const [show, setShow] = useState(false)

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

	// Fonction d'import:
	const onSubmit = (data) => {
		// Création du FormData:
		let formData = new FormData()
		Object.keys(data).forEach((key) => {
			formData.append(key, data[key][0])
		})

		// On bloque si le fichier n'est pas de type CSV:
		if (formData.get('excel').type !== 'text/csv') {
			return setApiResponse({
				type: 'error',
				message: 'Fichier de type CSV requis.'
			})
		}

		// Execution de la requête:
		axios
			.put(
				`${process.env.REACT_APP_API_DOMAIN}brand/udpateManyByExcelImport`,
				formData
			)
			.then((res) => {
				setValue('excel', null)
				setApiResponse({
					type: 'success',
					message: res.data.message
				})
				setShow(false)
			})
			.catch((error) => {
				setApiResponse(returnApiResponseError(error))
			})
	}

	return (
		<>
			<Button
				classList="mx-2"
				label={'Mettre à jour par Excel'}
				onClick={() => setShow(true)}
			/>
			<Modal show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Importation par Excel</Modal.Title>
				</Modal.Header>
				<form
					encType="multipart/form-data"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Modal.Body>
						<div className="justify-center">
							<input type="file" {...register('excel')} />
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
							label="Annuler"
							onClick={() => setShow(false)}
						/>
						<Button type="submit" label="Confirmer" />
					</Modal.Footer>
				</form>
			</Modal>
		</>
	)
}

export default BrandPart
