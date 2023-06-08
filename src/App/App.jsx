import './App.scss'
import { useState, useEffect } from 'react'
import { Div } from '../components/templates'
import { ApiResponse, Sidebar } from '../components/multiparty'
import {
	Customers,
	CreateCustomer,
	Identification,
	Sales,
	CreateSale
} from '../pages'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
	getAllAttributes,
	getAllBrands,
	getAllClasses,
	getAllColors,
	getAll,
	getAllCustomerGroups,
	getAllCustomers,
	getAllCustomerTypes,
	getAllMaterials,
	getAllPrints,
	getAllQualities,
	getAllSeasons,
	getAllSizes,
	getAllStates,
	getAllSupportsLines,
	getAllTypes
} from '../services'
import { formateOptions } from '../utils/functions'

const App = ({ apiResponse, setApiResponse }) => {
	// * Récupération des datas et transformation en options:
	const defaultDataState = {
			datas: [],
			options: [],
			refreshDate: null,
			setter: null
		},
		[datas, setDatas] = useState({}),
		[datasLoaded, setDatasLoaded] = useState(false),
		{ boxs, categories, styles, tvas } = datas,
		[attributes, setAttributes] = useState(defaultDataState),
		[brands, setBrands] = useState(defaultDataState),
		[classes, setClasses] = useState(defaultDataState),
		[colors, setColors] = useState(defaultDataState),
		[customers, setCustomers] = useState(defaultDataState),
		[customersGroups, setCustomersGroups] = useState(defaultDataState),
		[customersTypes, setCustomersTypes] = useState(defaultDataState),
		[materials, setMaterials] = useState(defaultDataState),
		[prints, setPrints] = useState(defaultDataState),
		[qualities, setQualities] = useState(defaultDataState),
		[seasons, setSeasons] = useState(defaultDataState),
		[sizes, setSizes] = useState(defaultDataState),
		[states, setStates] = useState(defaultDataState),
		[supportsLines, setSupportsLines] = useState(defaultDataState),
		[types, setTypes] = useState(defaultDataState),
		datasToGET = [
			{
				getterFunction: getAllAttributes,
				setter: setAttributes
			},
			{
				getterFunction: getAllBrands,
				setter: setBrands
			},
			{
				getterFunction: getAllClasses,
				setter: setClasses
			},
			{
				getterFunction: getAllColors,
				setter: setColors
			},
			{
				getterFunction: getAllCustomers,
				setter: setCustomers
			},
			{
				getterFunction: getAllCustomerGroups,
				setter: setCustomersGroups
			},
			{
				getterFunction: getAllCustomerTypes,
				setter: setCustomersTypes
			},
			{
				getterFunction: getAllMaterials,
				setter: setMaterials
			},
			{
				getterFunction: getAllPrints,
				setter: setPrints
			},
			{
				getterFunction: getAllQualities,
				setter: setQualities
			},
			{
				getterFunction: getAllSeasons,
				setter: setSeasons
			},
			{
				getterFunction: getAllSizes,
				setter: setSizes
			},
			{
				getterFunction: getAllStates,
				setter: setStates
			},
			{
				getterFunction: getAllSupportsLines,
				setter: setSupportsLines
			},
			{
				getterFunction: getAllTypes,
				setter: setTypes
			}
		],
		routes = [
			{
				path: '/createCustomer',
				element: (
					<CreateCustomer
						datas={{
							brands,
							customersGroups,
							customersTypes,
							qualities,
							tvas
						}}
					/>
				)
			},
			{
				path: '/customers',
				element: <Customers customers={customers} />
			},
			{
				path: '/identification',
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
				path: '/sales',
				element: <Sales sales={[]} />
			},
			{
				path: '/createSale',
				element: <CreateSale />
			}
		]

	useEffect(() => {
		let refreshDate = new Date().toISOString()

		datasToGET.forEach((datas) => {
			let { getterFunction, setter } = datas

			getterFunction().then((data) => {
				let { datas } = data,
					datasToState = [],
					optionsToState = []

				if (datas) {
					datasToState = JSON.parse(JSON.stringify(datas))
					optionsToState = formateOptions(
						JSON.parse(JSON.stringify(datas))
					)
				}

				setter({
					datas: datasToState,
					options: optionsToState,
					refreshDate,
					setter
				})
			})
		})

		getAll().then((data) => {
			let datasToState = {}
			Object.keys(data.datas).forEach((key) => {
				datasToState[key] = {
					datas: data.datas[key],
					options: formateOptions(
						JSON.parse(JSON.stringify(data.datas[key]))
					),
					refreshDate
				}
			})
			setDatas(datasToState)
			setDatasLoaded(true)
		})
	}, [])

	return (
		<ProSidebarProvider>
			<Div id={'app'}>
				<Router>
					<Sidebar />
					<Div id={'app__page'}>
						{datasLoaded && (
							<Routes>
								{routes.map((route) => {
									let { path, element, exact } = route
									return (
										<Route
											key={path}
											path={path}
											element={element}
											exact={exact}
										/>
									)
								})}
							</Routes>
						)}
						<ApiResponse apiResponse={apiResponse} />
					</Div>
				</Router>
			</Div>
		</ProSidebarProvider>
	)
}

export default App
