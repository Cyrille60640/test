import {
	Sidebar as RPSidebar,
	Menu,
	SubMenu,
	MenuItem,
	useProSidebar
} from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
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
		userInfos = useContext(Context),
		{ lastname: userLastname, firstname: userFirstname } = userInfos

	// * Déclarations des SubMenus:
	const subMenus = [
		{
			icon: <RiFilePaper2Line />,
			label: 'Commandes',
			items: [
				{ label: 'Nouvelle Commande', link: '/createSale' },
				{ label: 'Liste Des Commandes', link: '/sales' }
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
				{ label: 'Liste Des Produits', link: '' },
				{ label: 'Identification', link: '/identification' },
				{ label: 'Produits A Photographier', link: '' },
				{ label: 'Produits A Valider', link: '' },
				{ label: 'Produits A Transférer', link: '' },
				{ label: 'Produits Transférés', link: '' },
				{ label: 'Produits Supprimés', link: '' }
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
				{ label: 'Liste Des Marques', link: '' },
				{ label: 'Liste Des Marques Non Identifiées', link: '' }
			]
		},
		{
			icon: <BsTable />,
			label: 'Administration',
			items: [
				{ label: 'Utilisateurs', link: '' },
				{ label: 'Catégories', link: '' },
				{ label: 'Classes', link: '' },
				{ label: 'Etats', link: '' },
				{ label: 'Imprimés', link: '' },
				{ label: 'Tailles', link: '' },
				{ label: 'Matières', link: '' },
				{ label: 'Sous-Attributs', link: '' },
				{ label: 'Groupes de Types', link: '' },
				{ label: 'Types', link: '' },
				{ label: 'Styles', link: '' },
				{ label: 'Paramêtrage EAN13', link: '' }
			]
		}
	]

	// * Fonction de déconnexion:
	const disconnect = () => {
		localStorage.clear()
		// localStorage.removeItem('REACT_AUTH_TOKEN')
		window.location.reload()
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
								component={<Link to={link} />}
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
			<Div id={'sidebar__header'}>
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
