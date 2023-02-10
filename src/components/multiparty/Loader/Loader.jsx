import './Loader.scss'
import { Div, Img } from '../../templates'
import { logo, logoTitle } from '../../../assets'

const Loader = ({ isFullScreen }) => {
	const Spinner = () => {
		return <Img id={'loader__spinner'} src={logo} alt={'Chargement..'} />
	}

	return (
		<Div id={'loader'}>
			{!isFullScreen ? (
				<Div>
					<Spinner />
				</Div>
			) : (
				<Div id={'loader--fullScreen'}>
					<Img src={logoTitle} alt={'Sapée'} />
					<Spinner />
				</Div>
			)}
		</Div>
	)
}

export default Loader
