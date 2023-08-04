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
		[checked, setChecked] = useState(false),
		[apiResponse, setApiResponse] = useState()

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
			let { status_code, message, messageMustBeShown } = response.data
			if (messageMustBeShown) {
				setApiResponse({
					type: [200, 201].includes(status_code)
						? 'success'
						: 'warning',
					message
				})
			}
			return response
		},
		(error) => {
			if (process.env.ENVIRONMENT === 'DEV') {
				console.error(error)
			}

			if (error.response) {
				let { data, status } = error.response
				if (status !== 401) {
					console.log(error.response)
					let { message } = data
					setApiResponse({ type: 'error', message })
				} else {
					localStorage.clear()
					window.location.reload(false)
				}
			} else {
				setApiResponse({ type: 'error', message: 'Erreur !' })
			}

			throw error
		}
	)

	// * Rendus:
	if (!checked) {
		return <Loader isFullScreen />
	} else if (!isConnected) {
		return <Connect apiResponse={apiResponse} />
	} else {
		return (
			<Context.Provider value={userInfos}>
				<App
					apiResponse={apiResponse}
					setApiResponse={setApiResponse}
				/>
			</Context.Provider>
		)
	}
}
