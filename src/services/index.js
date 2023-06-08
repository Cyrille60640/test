import { getAllAttributes } from './attribute'
import { createBox } from './box'
import { getAllBrands } from './brand'
import { getAllClasses } from './class'
import { getAllColors } from './color'
import { getAll } from './common'
import {
	createOneCustomer,
	getAllCustomers,
	uploadCustomerLogo
} from './customer'
import {
	createCustomerGroup,
	getAllCustomerGroups,
	refreshCustomersGroups
} from './customerGroup'
import { getAllCustomerTypes } from './customerType'
import { getAllMaterials } from './material'
import { getPriceForIdentification } from './pricing'
import { getAllPrints } from './print'
import { createProduct, getAllProducts } from './product'
import { getAllQualities } from './quality'
import { getAllSeasons } from './season'
import { getAllSizes } from './size'
import { getAllStates } from './state'
import { getAllSupportsLines } from './supportsLine'
import { getAllTypes } from './type'
import { authenticateUser, checkBearer } from './user'

const getSpecificsProducts = () => {
		return {}
	},
	concludeBox = () => {
		return {}
	},
	getSupportsForOneLine = () => {
		return {}
	},
	getForbiddenBrandsForADistributor = () => {
		return {}
	},
	getQualitiesForADistributor = () => {
		return {}
	},
	getOneBrand = () => {
		return {}
	},
	getCurrentsOrders = () => {
		return {}
	},
	getOneOrder = () => {
		return {}
	}

export {
	getAllAttributes,
	createBox,
	getAllBrands,
	getAllClasses,
	getAllColors,
	getAll,
	createOneCustomer,
	getAllCustomers,
	uploadCustomerLogo,
	createCustomerGroup,
	getAllCustomerGroups,
	refreshCustomersGroups,
	getAllCustomerTypes,
	getAllMaterials,
	getAllPrints,
	createProduct,
	getAllProducts,
	getAllQualities,
	getAllSeasons,
	getAllSizes,
	getAllStates,
	getAllSupportsLines,
	getAllTypes,
	authenticateUser,
	checkBearer,
	getSpecificsProducts,
	concludeBox,
	getSupportsForOneLine,
	getForbiddenBrandsForADistributor,
	getQualitiesForADistributor,
	getOneBrand,
	getCurrentsOrders,
	getOneOrder,
	getPriceForIdentification
}
