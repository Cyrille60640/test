import './App.scss'
import { useState, useEffect } from 'react'
import { Div } from '../components/templates'
import { Rooting } from './modules'
import { ProSidebarProvider } from 'react-pro-sidebar'
import {
	getAllAttributes,
	getAllClasses,
	getAllColors,
	getAll,
	getAllProducts,
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
			refreshDate: null,
			setter: null
		},
		[datas, setDatas] = useState({}),
		[datasLoaded, setDatasLoaded] = useState(false),
		[attributes, setAttributes] = useState(defaultDataState),
		[classes, setClasses] = useState(defaultDataState),
		[colors, setColors] = useState(defaultDataState),
		[customers, setCustomers] = useState(defaultDataState),
		[customersGroups, setCustomersGroups] = useState(defaultDataState),
		[customersTypes, setCustomersTypes] = useState(defaultDataState),
		[materials, setMaterials] = useState(defaultDataState),
		[prints, setPrints] = useState(defaultDataState),
		[products, setProducts] = useState(defaultDataState),
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
		]

	useEffect(() => {
		let refreshDate = new Date().toISOString()

		datasToGET.forEach((datas) => {
			let { getterFunction, setter } = datas

			getterFunction().then((data) => {
				let { datas } = data,
					datasToState = []

				if (datas) {
					datasToState = JSON.parse(JSON.stringify(datas))
				}

				setter({
					datas: datasToState,
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
					refreshDate
				}
			})
			setDatas(datasToState)
			setDatasLoaded(true)
		})
	}, [])

	useEffect(() => {
		let refreshDate = new Date().toISOString()
		if (datasLoaded) {
			let { brands } = datas
			getAllProducts({ brands, colors }).then((data) => {
				setProducts({
					datas: data.datas,
					refreshDate
				})
			})
		}
	}, [datasLoaded])

	return (
		<ProSidebarProvider>
			<Div id={'app'}>
				<Rooting
					datasLoaded={datasLoaded}
					datas={datas}
					products={products}
					apiResponse={apiResponse}
					setApiResponse={setApiResponse}
				/>
			</Div>
		</ProSidebarProvider>
	)
}

export default App
