import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import App from './App/App'
import { Connect } from './pages'
import jwtDecode from 'jwt-decode'
import { Loader } from './components/multiparty'
import { checkBearer } from './services'

// * Déclaration du context:
export const Context = createContext({
	userInfos: {}
})

export const Logger = () => {
	// * Déclarations:
	const [isConnected, setConnexion] = useState(false),
		[userInfos, setUserInfos] = useState({}),
		[checked, setChecked] = useState(false)

	// * Check du Bearer:
	useEffect(() => {
		let storedToken = localStorage.getItem(
			'REACT_TOKEN_AUTH_TRI_ECOTEXTILE'
		)
		if (!storedToken) {
			setChecked(true)
		} else {
			let token = JSON.parse(storedToken)
			axios.defaults.headers.common = {
				Authorization: 'bearer ' + token
			}
			checkBearer().then(() => {
				setConnexion(true)
				setUserInfos({ ...jwtDecode(token).user, token })
				setChecked(true)
			})
		}
	}, [])

	// * Intercepteur Axios:
	axios.interceptors.response.use(
		(response) => {
			return response
		},
		(error) => {
			if (error) {
				let { response } = error
				if (
					response &&
					response.status === 401 &&
					response.data.message !== 'Mot de passe incorrect..'
				) {
					localStorage.clear()
					window.location.reload()
				} else {
					console.log(error)
				}
			} else {
				console.log('Erreur !')
			}

			throw error
		}
	)

	// * Rendus:
	if (!checked) {
		return <Loader isFullScreen />
	} else if (!isConnected) {
		return <Connect />
	} else {
		return (
			<Context.Provider value={userInfos}>
				<App />
			</Context.Provider>
		)
	}
}
