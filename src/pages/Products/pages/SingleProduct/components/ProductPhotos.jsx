import { Div, Img } from '../../../../../components/templates'
import { useState } from 'react'

const ProductPhotos = ({ id }) => {
	// * Déclarations:
	const [photosAreLoaded, setPhotosAreLoaded] = useState({
			photo1: false,
			photo2: false,
			photo3: false,
			photo4: false
		}),
		{ photo1, photo2, photo3, photo4 } = photosAreLoaded

	// * Rendu:
	return (
		<Div className={'justify-around'}>
			<Img
				className={`w-25 ${!photo1 && 'd-none'}`}
				src={`http://api-tri.ecotextile.fr/${id}/1-${id}.jpg`}
				alt={'Photo 1'}
				onLoad={() =>
					setPhotosAreLoaded({ ...photosAreLoaded, photo1: true })
				}
			/>
			<Img
				className={`w-25 ${!photo2 && 'd-none'}`}
				src={`http://api-tri.ecotextile.fr/${id}/2-${id}.jpg`}
				alt={'Photo 2'}
				onLoad={() =>
					setPhotosAreLoaded({ ...photosAreLoaded, photo2: true })
				}
			/>
			<Img
				className={`w-25 ${!photo3 && 'd-none'}`}
				src={`http://api-tri.ecotextile.fr/${id}/3-${id}.jpg`}
				alt={'Photo 3'}
				onLoad={() =>
					setPhotosAreLoaded({ ...photosAreLoaded, photo3: true })
				}
			/>
			<Img
				className={`w-25 ${!photo4 && 'd-none'}`}
				src={`http://api-tri.ecotextile.fr/${id}/4-${id}.jpg`}
				alt={'Photo 4'}
				onLoad={() =>
					setPhotosAreLoaded({ ...photosAreLoaded, photo4: true })
				}
			/>
		</Div>
	)
}

export default ProductPhotos
