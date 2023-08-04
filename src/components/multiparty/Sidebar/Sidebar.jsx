import {
	Sidebar as RPSidebar,
	Menu,
	SubMenu,
	MenuItem,
	useProSidebar
} from 'react-pro-sidebar'
import { useNavigate } from 'react-router-dom'
import { useContext, forwardRef } from 'react'
import { Context } from '../../../Logger'
import { Button, Div, Img } from '../../templates'
import './Sidebar.scss'
import { logo, logoTitle } from '../../../assets'
import { BiLogOutCircle } from 'react-icons/bi'
import { BsArrowReturnLeft, BsFillBoxFill, BsTable } from 'react-icons/bs'
import { RiFilePaper2Line } from 'react-icons/ri'
import { GiClothes } from 'react-icons/gi'
import { FaPeopleCarry } from 'react-icons/fa'
import { SiNike } from 'react-icons/si'
import { Tooltip } from '@mui/material'

const Sidebar = () => {
	// * Déclarations:
	const { collapsed } = useProSidebar(),
		navigate = useNavigate(),
		userInfos = useContext(Context),
		{ lastname: userLastname, firstname: userFirstname } = userInfos

	// * Déclarations des SubMenus:
	const subMenus = [
		{
			icon: <RiFilePaper2Line />,
			label: 'Commandes',
			items: [
				{ label: 'Nouvelle Commande', link: '/createSale' },
				{ label: 'Liste Des Commandes', link: '/sales' },
				{ label: 'Commandes en ligne', link: '/newOnlineSales' }
			]
		},
		{
			icon: <BsArrowReturnLeft />,
			label: 'Retours',
			items: [
				{ label: 'Nouveau Retour', link: '' },
				{ label: 'Liste Des Retours', link: '' }
			]
		},
		{
			icon: <GiClothes />,
			label: 'Produits',
			items: [
				{ label: 'Liste Des Produits', link: '/products' },
				{ label: 'Identification', link: '/identification' },
				{
					label: 'Produits A Photographier',
					link: '/productsToPhotograph'
				},
				{ label: 'Produits A Valider', link: '/productsToValidate' },
				{ label: 'Produits A Transférer', link: '/productsToTransfer' },
				{ label: 'Produits Transférés', link: '/transferredProducts' },
				{ label: 'Produits Supprimés', link: '/deletedProducts' }
			]
		},
		{
			icon: <FaPeopleCarry />,
			label: 'Clients',
			items: [
				{ label: 'Nouveau Client', link: '/createCustomer' },
				{ label: 'Liste Des Clients', link: '/customers' },
				{ label: 'Liste Des Prix', link: '' }
			]
		},
		{
			icon: <BsFillBoxFill />,
			label: 'Stock',
			items: [
				{ label: 'Liste Des Mouvements Des Stocks', link: '' },
				{ label: 'Déplacer Des Produits', link: '' },
				{ label: 'Ajouter Des Produits Via Scan', link: '' },
				{ label: 'Liste Des Cartons', link: '' }
			]
		},
		{
			icon: <SiNike />,
			label: 'Marques',
			items: [
				{ label: 'Liste Des Marques', link: '/brands' },
				{
					label: 'Liste Des Marques Non Identifiées',
					link: '/unidentifiedBrands'
				}
			]
		},
		{
			icon: <BsTable />,
			label: 'Administration',
			items: [
				{ label: 'Utilisateurs', link: '/admin/users' },
				{ label: 'Attributs', link: '/admin/attributes' },
				{ label: 'Catégories', link: '/admin/categories' },
				{ label: 'Classes', link: '/admin/classes' },
				{ label: 'Etats', link: '/admin/states' },
				{ label: 'Imprimés', link: '/admin/prints' },
				{ label: 'Tailles', link: '/admin/sizes' },
				{ label: 'Matières', link: '/admin/materials' },
				{ label: 'Groupes de Types', link: '/admin/typeGroups' },
				{ label: 'Types', link: '/admin/types' },
				{ label: 'Styles', link: '/admin/styles' },
				{ label: 'Paramêtrage EAN13', link: '/admin/ean13' }
			]
		}
	]

	// * Fonction de déconnexion:
	const disconnect = () => {
		localStorage.clear()
		// localStorage.removeItem('REACT_AUTH_TOKEN')
		window.location.reload(false)
	}

	const MyComponent = forwardRef(function MyComponent(props, ref) {
		let { icon, items } = props
		//  Spread the props to the underlying DOM element.
		return (
			<div {...props} ref={ref}>
				<SubMenu label={icon}>
					{items.map((item) => {
						let { label, link } = item
						return (
							<MenuItem
								key={label}
								onClick={() => navigate(link)}
								// component={<Link to={link} />}
							>
								{label}
							</MenuItem>
						)
					})}
				</SubMenu>
			</div>
		)
	})

	return (
		<RPSidebar id={'sidebar'} defaultCollapsed={true}>
			<Div id={'sidebar__header'} onClick={() => navigate('/')}>
				<Img src={logo} alt={'Logo Sapée'} />
				<Img src={logoTitle} alt={'Titre Sapée'} />
			</Div>
			<Menu>
				{subMenus.map((subMenu) => {
					let { icon, items, label } = subMenu
					return (
						<Tooltip key={label} title={label} followCursor>
							<MyComponent icon={icon} items={items} />
						</Tooltip>
					)
				})}
			</Menu>
			<Div id={'sidebar__footer'}>
				{`${userFirstname.substring(0, 1)}. ${userLastname}`}
				<Button label={<BiLogOutCircle />} onClick={disconnect} />
			</Div>
		</RPSidebar>
	)
}

export default Sidebar
