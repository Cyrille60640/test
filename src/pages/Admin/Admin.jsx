import { useState, useEffect } from 'react'
import { Button, Div, Modal, Table, Title } from '../../components/templates'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { getFrenchTitleForTable } from '../../utils/functions'
import { useLocation } from 'react-router-dom'

const Admin = ({ datas, setApiResponse }) => {
	// * Déclarations:
	let { table } = useParams(),
		{ state } = useLocation(),
		[tableValues, setTableValues] = useState([]),
		[title, setTitle] = useState(''),
		[openConfirmationModal, setOpenConfirmationModal] = useState(false)

	// * Exécution initiale:
	useEffect(() => {
		// Génération du titre:
		setTitle(getFrenchTitleForTable(table))

		// Récupération des valeurs:
		setTableValues(datas[table].datas)
		// // axios.get(process.env.REACT_APP_API_DOMAIN + table).then((res) => {
		// // 	setTableValues(res.data.datas)
		// // })

		// Récupération d'une potentiel props SnackBar en cas d'update:
		if (state && state.snackParams) {
			let { severity: type, message } = state.snackParams
			setApiResponse({ type, message })
		}
	}, [table])

	// * Gestion des columns et des csvKeys:
	// Définition primaire:
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
		],
		keysForCSV = ['id', 'name']

	// Rajout de colonnes et clés csv selon la table affichée:
	switch (table) {
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
		default:
	}

	// Ajout final de la colonne actions (sauf pour category):
	if (table !== 'category') {
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

	// * Gestion de la recherche:
	// // const [filterName, setFilterName] = useState(''),
	// // 	[resetPaginationToggle, setResetPaginationToggle] = useState(false),
	// // 	tableValuesFiltered = tableValues.filter((value) => {
	// // 		if (filterName === '') {
	// // 			return true
	// // 		}
	// // 		return value.name.toLowerCase().includes(filterName.toLowerCase())
	// // 	}),
	// // 	subHeaderComponentMemo = useMemo(() => {
	// // 		const handleClear = () => {
	// // 			if (filterName) {
	// // 				setResetPaginationToggle(!resetPaginationToggle)
	// // 				setFilterName('')
	// // 				document.querySelector('#search').value = ''
	// // 			}
	// // 		}
	// // 		return (
	// // 			<Filter
	// // 				onFilter={(e) => setFilterName(e.target.value)}
	// // 				onClear={handleClear}
	// // 				filterText={filterName}
	// // 			/>
	// // 		)
	// // 	}, [filterName, resetPaginationToggle])

	// * Gestion des actions update et delete:
	const handleAction = (e) => {
			let params = e.target.value.split('-')
			let action = params[0]
			let idElement = params[1]

			if (action === 'manage') {
				window.location.assign(`/managePricingList/${idElement}`)
			} else if (action === 'update') {
				window.location.assign(`/addElement/${table}/${idElement}`)
			} else if (action === 'delete') {
				setOpenConfirmationModal(true)
				setTimeout(() => {
					document.querySelector('#confirmationBtn').dataset.id =
						idElement
				}, 500)
			}
		},
		handleDelete = (e) => {
			axios
				.delete(
					`${process.env.REACT_APP_API_DOMAIN}${table}/${e.target.dataset.id}`
				)
				.then((res) => {
					if (res.status === 200) {
						// On met à jour le tableau:
						let tableValuesToState = tableValues
						tableValuesToState = tableValuesToState.filter(
							(tableValue) =>
								tableValue.id !== parseInt(e.target.dataset.id)
						)
						setTableValues(tableValuesToState)
						setOpenConfirmationModal(false)
					}
				})
		}

	return (
		<>
			<Div className="align-center flex-column py-3">
				<Title title={title} />
				<Div className="align-center my-2">
					<Link to={`/admin/addElement/${table}`}>
						<Button classList="me-2" label={'Ajouter un élément'} />
					</Link>
				</Div>
				<Table
					columns={columns}
					datas={tableValues}
					pagination
					keysForCSV={keysForCSV}
					csvName={table}
					subHeader
					// // subHeaderComponent={subHeaderComponentMemo}
				/>
				<Modal
					open={openConfirmationModal}
					setOpen={setOpenConfirmationModal}
					content={{
						header: 'Confirmation',
						body: 'Etes-vous sur de vouloir supprimer cette enregistrement ?',
						footer: (
							<Div>
								<Button
									label="Annuler"
									onClick={() =>
										setOpenConfirmationModal(false)
									}
								/>
								<Button
									data="confirmationBtn"
									label="Confirmer"
									onClick={handleDelete}
								/>
							</Div>
						)
					}}
				/>
			</Div>
		</>
	)
}

export default Admin
