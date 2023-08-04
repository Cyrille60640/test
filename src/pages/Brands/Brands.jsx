import { Table } from '../../components/templates'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Brands = ({ brands }) => {
	const { pathname } = useLocation(),
		[brandsDatas, setBrandsDatas] = useState({}),
		{ options, title, keysForCSV } = brandsDatas

	useEffect(() => {
		switch (pathname) {
			case '/unidentifiedBrands':
				let brandsToState = brands.filter(
					(brand) => brand.id_quality === 5
				)
				setBrandsDatas({
					options: brandsToState,
					title: 'Marques non identifiées',
					keysForCSV: ['id', 'name']
				})
				break

			default:
				setBrandsDatas({
					options: brands,
					title: 'Marques',
					keysForCSV: ['id', 'name', 'id_quality']
				})
		}
	}, [pathname])

	return (
		<Table
			columns={[]}
			datas={options}
			title={title}
			keysForCSV={keysForCSV}
			csvName={pathname.split('/')[1]}
		/>
	)
}

export default Brands
