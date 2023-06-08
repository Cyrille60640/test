import './BoxLabel.scss'
import logo from '../../../assets/logo-line.png'
import { Div, Img } from '../../templates'
import { useState, useEffect, memo } from 'react'
import { handleElementDisplay } from '../../../utils/functions'

const BoxLabel = ({
	labelInfos,
	setLabelInfos,
	idsToDNone,
	classesToDNone,
	functionAfterPrint
}) => {
	// * Destructuration des props:
	const {
		supportsLineRef,
		supportRef,
		weight,
		productsCount,
		code,
		designation,
		typesInfos
	} = labelInfos ?? {}

	// * Gestion de l'impression:
	const [logoLoaded, setLogoLoaded] = useState(false)
	useEffect(() => {
		if (logoLoaded && labelInfos) {
			handleElementDisplay('add', idsToDNone, classesToDNone)
			setTimeout(() => {
				window.print()
			}, 500)
		}
	}, [logoLoaded, labelInfos])

	// * Gestion de l'après impression:
	window.addEventListener('afterprint', () => {
		if (labelInfos) {
			// ! Obsolète car on est passé sur du react-select, à revoir:
			// document.querySelectorAll('.actionsSelect').forEach((select) => {
			// 	select.value = { value: '', label: '' }
			// })

			setLabelInfos()
			handleElementDisplay('remove', idsToDNone, classesToDNone)
			if (functionAfterPrint) {
				functionAfterPrint()
			}
		}
	})

	// * Logo:
	const LabelLogo2 = memo(() => {
		return (
			<Img
				srcValue={logo}
				altValue="Logo Sapée"
				className={'mt-3'}
				onLoad={() => setLogoLoaded(true)}
			/>
		)
	})

	// * Rendu:
	if (!labelInfos) {
		return false
	} else {
		return (
			<Div id={'boxLabel'}>
				<Div className={'boxLabel__locator'}>
					<Div className={'boxLabel__container'}>
						<Div className={'boxLabel__logo'}>
							<LabelLogo2 />
						</Div>
						<Div className={'boxLabel__table'}>
							<Div className={'boxLabel__big-row'}>
								<Div className={'boxLabel__first-cell'}>
									CARTON
								</Div>
								<Div
									className={'boxLabel__second-cell'}
								>{`${supportsLineRef} ${supportRef}`}</Div>
							</Div>
							<Div className={'boxLabel__big-row'}>
								<Div className={'boxLabel__first-cell'}>
									CODE
								</Div>
								<Div className={'boxLabel__second-cell'}>
									{code}
								</Div>
							</Div>
							<Div className={'boxLabel__designation-cell'}>
								{designation}
							</Div>
							<Div className={'boxLabel__types-cell'}>
								{typesInfos}
							</Div>
							<Div className={'boxLabel__footer'}>
								<Div>QTE: {productsCount} pièces</Div>
								<Div>KG: {weight}</Div>
							</Div>
						</Div>
					</Div>
				</Div>
				<Div className={'boxLabel__locator'}>
					<Div className={'boxLabel__container'}>
						<Div className={'boxLabel__logo'}>
							<LabelLogo2 />
						</Div>
						<Div className={'boxLabel__table'}>
							<Div className={'boxLabel__big-row'}>
								<Div className={'boxLabel__first-cell'}>
									CARTON
								</Div>
								<Div
									className={'boxLabel__second-cell'}
								>{`${supportsLineRef} ${supportRef}`}</Div>
							</Div>
							<Div className={'boxLabel__big-row'}>
								<Div className={'boxLabel__first-cell'}>
									CODE
								</Div>
								<Div className={'boxLabel__second-cell'}>
									{code}
								</Div>
							</Div>
							<Div className={'boxLabel__designation-cell'}>
								{designation}
							</Div>
							<Div className={'boxLabel__types-cell'}>
								{typesInfos}
							</Div>
							<Div className={'boxLabel__footer'}>
								<Div>QTE: {productsCount} pièces</Div>
								<Div>KG: {weight}</Div>
							</Div>
						</Div>
					</Div>
				</Div>
			</Div>
		)
	}
}

export default BoxLabel
