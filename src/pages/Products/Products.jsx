import './Products.scss'
import { Div, Img, Table } from '../../components/templates'
import { useState, useEffect } from 'react'
import { getAllProducts } from '../../services'

const Products = ({ items, setApiResponse }) => {
	// * Déclarations:
	const [products, setProducts] = useState([]),
		[selectedProduct, setSelectedProduct] = useState(),
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
				name: 'Couleur',
				selector: (row) => row.color.name,
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
		getAllProducts(items).then((data) => {
			let { datas, message } = data
			console.log(datas[0])
			setProducts(datas)
			setApiResponse({ type: 'success', message })
		})
	}, [])

	return (
		<Div id={'products'}>
			<Div id={'products__table'}>
				<Table
					columns={columns}
					datas={products}
					title={'Produits'}
					pagination
					paginationResetDefaultPage
					keysForCSV={csvKeys}
					csvName={'products'}
					pointerOnHover
					onRowClicked={setSelectedProduct}
				/>
			</Div>
			<Div className={'h-50 w-100'}>
				{!selectedProduct ? (
					'Cliquer sur un produit pour en afficher son détail et ses mouvements de stock.'
				) : (
					<Div className={'justify-around w-100'}>
						<Div>
							{!selectedProduct
								? 'Cliquer sur un produit pour en afficher le détail.'
								: `Ref: ${selectedProduct.ref}`}
						</Div>
						<Div>Flow</Div>
					</Div>
				)}
			</Div>
		</Div>
	)
}

export default Products
