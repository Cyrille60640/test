import './Products.scss'
import { Button, Div, Img, Table } from '../../components/templates'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { StockFlowTable, PriceFlowTable } from './components'
import { BsEye, BsPencilSquare } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'

const Products = ({ products, stockFlows, pricesHistory }) => {
	// * Déclarations:
	const [productsDatas, setProductsDatas] = useState({}),
		{ options, title } = productsDatas,
		[selectedProduct, setSelectedProduct] = useState(),
		navigate = useNavigate(),
		{ pathname } = useLocation(),
		columns = [
			{
				name: 'Aperçu',
				selector: (row) => (
					<Img
						className={'w-30'}
						src={`http://api-tri.ecotextile.fr/${row.id}/1-${row.id}.jpg`}
						alt={`Aperçu du produit ${row.ref}`}
					/>
				),
				width: '15%'
			},
			{
				name: 'Référence',
				selector: (row) => row.ref,
				width: '15%'
			},
			{
				name: 'Catégorie',
				selector: (row) => row.mainProduct.item.category.name,
				width: '15%'
			},
			{
				name: 'Saison',
				selector: (row) => row.mainProduct.item.season.name,
				width: '15%'
			},
			{
				name: 'Type',
				selector: (row) => row.mainProduct.type.name,
				width: '15%'
			},
			{
				name: 'Marque',
				selector: (row) => row.brand.name,
				width: '15%'
			},
			{
				name: 'Qualité',
				selector: (row) => row.mainProduct.quality.name,
				width: '15%'
			},
			{
				name: 'Etat',
				selector: (row) => row.mainProduct.state.name,
				width: '15%'
			},
			{
				name: 'Distributeur',
				selector: (row) => row.stockFlows[0].customer.social_reason,
				width: '15%'
			},
			{
				name: 'Prix',
				selector: (row) => row.price,
				width: '15%'
			},
			{
				name: 'Actions',
				selector: (row) => (
					<Div className={'justify-around'}>
						<Button
							className={'m-1'}
							label={<BsEye />}
							onClick={() =>
								navigate(`/singleProduct/${row.ref}`, {
									state: row
								})
							}
							tooltip={'Voir'}
						/>
						<Button
							className={'m-1'}
							label={<BsPencilSquare />}
							onClick={() =>
								navigate(`/updateProduct/${row.ref}`, {
									state: row
								})
							}
							tooltip={'Modifier'}
						/>
						<Button
							className={'m-1'}
							label={<AiOutlineDelete />}
							onClick={() => alert('Suppression')}
							tooltip={'Supprimer'}
						/>
					</Div>
				),
				width: '15%'
			}
		],
		csvKeys = [
			'id',
			'ref',
			'bar_code',
			'categoryName',
			'subCategoryName',
			'typeName',
			'stock',
			'origin_price',
			'price',
			'qualityName',
			'brandName',
			'colorName',
			'main_material',
			'secondary_material',
			'other_material',
			'printName',
			'sizeName',
			'stateName',
			'seasonName',
			'length_in_cm',
			'width_in_cm',
			'third_measure_in_cm',
			'classicOrRetro',
			'sapee_choice',
			'created_at',
			'photos_uploaded_at',
			'valided_at',
			'scan_at',
			'valid',
			'transferred',
			'supportRef',
			'boxNumber',
			'url_img_1_front',
			'url_img_2_back',
			'url_img_3_sticker',
			'url_img_4_spec',
			'id_order',
			'orderRef',
			'receiverName',
			'shipped_at',
			'deleted_at',
			'selled_at'
		]

	// * Récupération des produits:
	useEffect(() => {
		let { datas } = products
		if (datas.length > 0) {
			let productsToState
			switch (pathname) {
				case '/productsToPhotograph':
					productsToState = datas.filter(
						(product) =>
							!product.photos_uploaded_at &&
							!product.deleted_at &&
							(product.id_support <= 200 ||
								product.id_support > 300) &&
							product.id_order === 3
					)
					setProductsDatas({
						options: productsToState,
						title: 'Produits à photographier'
					})
					break

				case '/productsToValidate':
					productsToState = datas.filter(
						(product) =>
							product.photos_uploaded_at &&
							product.id_order === 3 &&
							!product.valid &&
							!product.deleted_at
					)
					setProductsDatas({
						options: productsToState,
						title: 'Produits à valider'
					})
					break

				case '/productsToTransfer':
					productsToState = datas.filter(
						(product) => product.valid && !product.transferred
					)
					setProductsDatas({
						options: productsToState,
						title: 'Produits à transférer'
					})
					break

				case '/transferredProducts':
					productsToState = datas.filter(
						(product) => product.transferred
					)
					setProductsDatas({
						options: productsToState,
						title: 'Produits transférés'
					})
					break

				case '/deletedProducts':
					productsToState = datas.filter(
						(product) => product.deleted_at
					)
					setProductsDatas({
						options: productsToState,
						title: 'Produits supprimés'
					})
					break

				default:
					setProductsDatas({
						options: datas,
						title: 'Produits'
					})
			}
		}
	}, [pathname, products])

	// * Fonction pour sélectionner un produit:
	const pickProduct = (row) => {
		if (!selectedProduct) {
			setSelectedProduct(row)
		} else {
			setSelectedProduct(row.id !== selectedProduct.id ? row : null)
		}
	}

	return products.datas.length === 0 ? (
		'Chargement des produits'
	) : (
		<Div id={'products'}>
			<Div id={'products__table'}>
				<Table
					columns={columns}
					datas={options}
					title={title}
					pagination
					paginationResetDefaultPage
					keysForCSV={csvKeys}
					csvName={pathname.split('/')[1]}
					actions={
						<Button
							label={'Reset'}
							onClick={() => setSelectedProduct()}
						/>
					}
					conditionalRowStyles={[
						{
							when: (row) =>
								selectedProduct &&
								row.id === selectedProduct.id,
							style: {
								backgroundColor: 'lightgray'
							}
						}
					]}
					pointerOnHover
					onRowClicked={pickProduct}
				/>
			</Div>
			<Div className={'h-50 w-100'}>
				<StockFlowTable
					product={selectedProduct}
					stockFlows={stockFlows.datas}
				/>
				<PriceFlowTable
					product={selectedProduct}
					pricesHistory={pricesHistory.datas}
				/>
			</Div>
		</Div>
	)
}

export default Products
