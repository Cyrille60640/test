import { useLocation, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Div } from '../../../../components/templates'
import { StockFlowTable, PriceFlowTable } from '../../components'
import { ProductDetails, ProductPhotos } from './components'

const SingleProduct = ({ products }) => {
	// * Déclarations:
	const { state: locationState } = useLocation(),
		{ ref: paramsRef } = useParams(),
		[product, setProduct] = useState({})

	// * Récupération du produit:
	useEffect(() => {
		if (Object.keys(product).length === 0) {
			if (locationState) {
				setProduct(locationState)
			} else {
				let { datas } = products
				if (datas.length > 0) {
					setProduct(
						datas.find((iteration) => iteration.ref === paramsRef)
					)
				}
			}
		}
	}, [products])

	return !locationState && products.datas.length === 0 ? (
		'Chargement du produit'
	) : (
		<Div>
			{Object.keys(product).length > 0 && (
				<ProductDetails product={product} />
			)}
			<ProductPhotos id={product.id} />
			<StockFlowTable product={product} />
			<PriceFlowTable product={product} />
		</Div>
	)
}

export default SingleProduct
