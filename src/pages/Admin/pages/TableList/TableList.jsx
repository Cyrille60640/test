import { useState, useEffect, useMemo } from 'react'
import { Button, Filter, Table } from '../../../../components/templates'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import {
	returnApiResponseError,
	getFrenchTitleForTable
} from '../../../../util/functions'
import { Modal } from 'react-bootstrap'
import { ApiResponse } from '../../../../components/multiparty'
import { useLocation } from 'react-router-dom'
import { BrandPart } from './components'

const TableList = () => {
	// * Déclarations:
	let table = useParams().table,
		{ state } = useLocation()
	const [apiResponse, setApiResponse] = useState(),
		[tableValues, setTableValues] = useState([]),
		[title, setTitle] = useState(''),
		[show, setShow] = useState(false)

	// * Exécution initiale:
	useEffect(() => {
		// Génération du titre:
		setTitle(getFrenchTitleForTable(table))

		// Récupération d'une potentiel props SnackBar:
		if (state && state.snackParams) {
			let { severity: type, message } = state.snackParams
			setApiResponse({ type, message })
		}
	}, [])

	useEffect(() => {
		let urlToGET =
			table !== 'undefinedBrand' ? table : 'brand/getAllUndefined'

		axios
			.get(process.env.REACT_APP_API_DOMAIN + urlToGET)
			.then((res) => {
				setTableValues(res.data.datas)
			})
			.catch((error) => {
				setApiResponse(returnApiResponseError(error))
			})
	}, [])

	// * Définition des columns:
	let columns = [
		{
			name: 'id',
			selector: (row) => row.id,
			maxWidth: '10%',
			center: true,
			sortable: true
		},
		{
			name: 'Nom',
			selector: (row) => row.name,
			maxWidth: '30%',
			center: true,
			sortable: true
		}
	]

	let keysForCSV = ['id', 'name']

	// Gestion de la recherche:
	const [filterName, setFilterName] = useState('')
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
	const tableValuesFiltered = tableValues.filter((value) => {
		if (filterName === '') {
			return true
		}
		return value.name.toLowerCase().includes(filterName.toLowerCase())
	})
	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterName) {
				setResetPaginationToggle(!resetPaginationToggle)
				setFilterName('')
				document.querySelector('#search').value = ''
			}
		}
		return (
			<Filter
				onFilter={(e) => setFilterName(e.target.value)}
				onClear={handleClear}
				filterText={filterName}
			/>
		)
	}, [filterName, resetPaginationToggle])

	// * BRAND: Rajout de la qualité de la marque dans les columns:
	switch (table) {
		case 'brand':
			columns.push({
				name: 'Qualité',
				selector: (row) => row.qualityName,
				maxWidth: '30%',
				center: true,
				sortable: true
			})
			keysForCSV.push('qualityName')
			break

		case 'undefinedBrand':
			keysForCSV.push('qualityName')
			break

		case 'size':
			columns.push(
				{
					name: 'Type',
					selector: (row) => row.type,
					maxWidth: '10%',
					center: true,
					sortable: true
				},
				{
					name: 'Taille universelle',
					selector: (row) => row.universal_size,
					maxWidth: '10%',
					center: true,
					sortable: true
				},
				{
					name: 'Taille enfant',
					selector: (row) => row.child_size,
					maxWidth: '10%',
					center: true,
					sortable: true
				},
				{
					name: 'Stature enfant',
					selector: (row) => row.child_stature,
					maxWidth: '10%',
					center: true,
					sortable: true
				},
				{
					name: 'ID Taille-Type',
					selector: (row) => row.id_size_type,
					maxWidth: '10%',
					center: true,
					sortable: true
				}
			)
			keysForCSV.push(
				'type',
				'universal_size',
				'child_size',
				'child_stature',
				'id_size_type'
			)
			break

		case 'tva':
			columns.push({
				name: 'Valeur',
				selector: (row) => row.value,
				maxWidth: '30%',
				center: true,
				sortable: true
			})
			keysForCSV.push('value')
			break

		case 'receiver':
			columns.push(
				{
					name: 'Ecommerce',
					selector: (row) => row.ecommerce,
					maxWidth: '10%',
					center: true,
					sortable: true
				},
				{
					name: 'Tva par défault',
					selector: (row) => row.tvaValue,
					maxWidth: '10%',
					center: true,
					sortable: true
				},
				{
					name: 'Commandes en cours',
					selector: (row) => row.currentsOrders,
					maxWidth: '10%',
					center: true,
					sortable: true
				},
				{
					name: 'Total commandes',
					selector: (row) => row.totalOrders,
					maxWidth: '10%',
					center: true,
					sortable: true
				},
				{
					name: 'Prix de valorisation',
					selector: (row) => row.stockValorisationPrice,
					maxWidth: '10%',
					center: true,
					sortable: true
				}
			)
			keysForCSV.push(
				'value',
				'ecommerce',
				'defaultTva',
				'currentsOrders',
				'totalOrders',
				'stockValorisationPrice'
			)
			break

		default:
	}

	// Ajout de la colonne actions (sauf pour category et subcategory):
	if (table !== 'category' && table !== 'subCategory') {
		columns.push({
			name: 'Actions',
			cell: (row) => (
				<select onChange={handleAction}>
					<option value=""></option>
					{table === 'pricingList' && (
						<option value={`manage-${row.id}`}>Gérer</option>
					)}
					<option value={`update-${row.id}`}>Modifier</option>
					<option value={`delete-${row.id}`}>Supprimer</option>
				</select>
			),
			maxWidth: '20%',
			center: true
		})
	}

	// Gestion des actions update et delete:
	const handleAction = (e) => {
		let params = e.target.value.split('-')
		let action = params[0]
		let idElement = params[1]

		if (action === 'manage') {
			window.location.assign(`/managePricingList/${idElement}`)
		} else if (action === 'update') {
			window.location.assign(`/addElement/${table}/${idElement}`)
		} else if (action === 'delete') {
			setShow(true)
			setTimeout(() => {
				document.querySelector('#confirmationBtn').dataset.id =
					idElement
			}, 500)
		}
	}

	const handleDelete = (e) => {
		const tableToGET = table !== 'undefinedBrand' ? table : 'brand'
		axios
			.delete(
				`${process.env.REACT_APP_API_DOMAIN}${tableToGET}/${e.target.dataset.id}`
			)
			.then((res) => {
				if (res.status === 200) {
					setApiResponse({
						type: 'success',
						message: res.data.message
					})
					// On met à jour le tableau:
					let tableValuesToState = tableValues
					tableValuesToState = tableValuesToState.filter(
						(tableValue) =>
							tableValue.id !== parseInt(e.target.dataset.id)
					)
					setTableValues(tableValuesToState)
					setShow(false)
				}
			})
			.catch((err) => {
				setApiResponse(returnApiResponseError(err))
			})
	}

	return (
		<>
			<div className="align-center flex-column py-3">
				<h2>{title}</h2>
				<div className="align-center my-2">
					<Link to={`/addElement/${table}`}>
						<Button classList="me-2" label={'Ajouter un élément'} />
					</Link>
					{['brand', 'undefinedBrand'].includes(table) && (
						<BrandPart setApiResponse={setApiResponse} />
					)}
					<Link to="/manageDB">
						<Button classList="ms-2" label={'Retour'} />
					</Link>
				</div>
				<Table
					columns={columns}
					datas={tableValuesFiltered}
					pagination
					keysForCSV={keysForCSV}
					csvName={table}
					subHeader
					subHeaderComponent={subHeaderComponentMemo}
				/>
				<Modal show={show} onHide={() => setShow(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Confirmation</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Etes-vous sur de vouloir supprimer cette enregistrement
						?
					</Modal.Body>
					<Modal.Footer>
						<Button
							label="Annuler"
							onClick={() => setShow(false)}
						/>
						<Button
							data="confirmationBtn"
							label="Confirmer"
							onClick={handleDelete}
						/>
					</Modal.Footer>
				</Modal>
			</div>
			<ApiResponse apiResponse={apiResponse} />
		</>
	)
}

export default TableList
