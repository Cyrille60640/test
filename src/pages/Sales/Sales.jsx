import './Sales.scss'
import { Button, Div, Table } from '../../components/templates'
import { useState } from 'react'
import { DeliveryFormModal } from './components'

const Sales = ({ sales }) => {
	// * Déclarations:
	const [selectedDeliveryFormOrderId, setSelectedDeliveryFormOrderId] =
			useState(),
		[openDeliveryFormOrderModal, setOpenDeliveryFormOrderModal] =
			useState(false),
		setOneSale = (ref) => {
			alert(`Visualisation Commande ${ref}`)
		}

	return (
		<>
			<Div className={'justify-around flex-column align-center'}>
				<Table
					columns={[
						{
							name: 'Référence',
							selector: (row) => row.ref
						},
						{
							name: 'Date',
							selector: (row) => row.sale_date
						},
						{
							name: 'Client',
							selector: (row) => row.id_customer
						},
						{
							name: 'Type Vente',
							selector: (row) => row.id_sale_type
						},
						{
							name: 'Prix',
							selector: (row) => row.price
						},
						{
							name: 'Etat',
							selector: (row) => 'Etat'
						},
						{
							name: 'Action',
							selector: (row) => (
								<Div>
									<Button
										className={'m-1'}
										label={'Voir'}
										onClick={() => setOneSale(row.ref)}
									/>
									<Button
										className={'m-1'}
										label={'BL'}
										onClick={() => {
											setSelectedDeliveryFormOrderId(
												row.id
											)
											setOpenDeliveryFormOrderModal(true)
										}}
									/>
								</Div>
							)
						}
					]}
					datas={sales.datas}
					title={'Ventes'}
					pagination
					paginationResetDefaultPage
					keysForCSV={[]}
					csvName={'sales'}
					onRowClicked={(row) => setOneSale(row.ref)}
				/>
				<Div>Détail de la vente:</Div>
			</Div>
			<DeliveryFormModal
				openDeliveryFormOrderModal={openDeliveryFormOrderModal}
				setOpenDeliveryFormOrderModal={setOpenDeliveryFormOrderModal}
				selectedDeliveryFormOrderId={selectedDeliveryFormOrderId}
			/>
		</>
	)
}

export default Sales
