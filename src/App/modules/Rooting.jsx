import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
	Admin,
	AddElement,
	Brands,
	Customers,
	CreateCustomer,
	Home,
	Identification,
	Products,
	SingleProduct,
	UpdateProduct,
	Sales,
	CreateSale,
	NewOnlineSales
} from '../../pages'
import { ApiResponse, Sidebar } from '../../components/multiparty'
import { Div } from '../../components/templates'

const Rooting = ({
	datasLoaded,
	datas,
	products,
	apiResponse,
	setApiResponse
}) => {
	const {
			attributes,
			boxProcessTables,
			boxs,
			brands,
			categories,
			classes,
			colors,
			customers,
			customersGroups,
			customersTypes,
			materials,
			pricesHistory,
			prints,
			qualities,
			sales,
			seasons,
			sizes,
			states,
			stockFlows,
			styles,
			supportsLines,
			tvas,
			types
		} = datas,
		routes = [
			{ paths: ['/'], element: <Home />, exact: true },
			{
				paths: ['/admin/:table'],
				element: (
					<Admin
						datas={{
							attributes,
							categories,
							classes,
							prints,
							sizes,
							states,
							styles,
							types
						}}
					/>
				)
			},
			{
				paths: ['/admin/addElement/:table'],
				element: <AddElement />
			},
			{
				paths: ['/brands', '/unidentifiedBrands'],
				element: <Brands brands={brands} />
			},
			{
				paths: ['/customers'],
				element: <Customers customers={customers} />
			},
			{
				paths: ['/createCustomer'],
				element: (
					<CreateCustomer
						datas={{
							brands,
							categories,
							boxProcessTables,
							customersGroups,
							customersTypes,
							qualities,
							seasons,
							styles,
							tvas,
							types
						}}
					/>
				)
			},
			{
				paths: ['/identification'],
				element: (
					<Identification
						datas={{
							attributes,
							boxs,
							brands,
							categories,
							classes,
							colors,
							customers,
							materials,
							prints,
							qualities,
							seasons,
							sizes,
							states,
							styles,
							supportsLines,
							types
						}}
						setApiResponse={setApiResponse}
					/>
				)
			},
			{
				paths: [
					'/products',
					'/productsToPhotograph',
					'/productsToValidate',
					'/productsToTransfer',
					'/transferredProducts',
					'/deletedProducts'
				],
				element: (
					<Products
						products={products}
						stockFlows={stockFlows}
						pricesHistory={pricesHistory}
					/>
				)
			},
			{
				paths: ['/singleProduct/:ref'],
				element: <SingleProduct products={products} />
			},
			{
				paths: ['/updateProduct/:ref'],
				element: <UpdateProduct products={products} />
			},
			{
				paths: ['/sales'],
				element: <Sales sales={sales} />
			},
			{
				paths: ['/createSale'],
				element: <CreateSale datas={{ customers }} />
			},
			{
				paths: ['/newOnlineSales'],
				element: <NewOnlineSales />
			}
		]

	return (
		<Router>
			<Sidebar />
			<Div id={'app__page'}>
				{datasLoaded && (
					<Routes>
						{routes.map((route) => {
							let { paths, element, exact } = route
							return paths.map((path) => {
								return (
									<Route
										key={path}
										path={path}
										element={element}
										exact={exact}
									/>
								)
							})
						})}
					</Routes>
				)}
				<ApiResponse apiResponse={apiResponse} />
			</Div>
		</Router>
	)
}

export default Rooting
