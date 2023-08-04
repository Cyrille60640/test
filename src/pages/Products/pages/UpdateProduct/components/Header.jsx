const Header = ({ product }) => {
	return (
		<div>
			<h2 className="text-center text-decoration-underline">
				Produit n° {product.id}
			</h2>
			<h3 className="subtitle text-center mb-0">
				Référence interne: {product.ref}
			</h3>
			<h3 className="subtitle text-center">
				Code barre: {product.bar_code}
			</h3>
		</div>
	)
}

export default Header
