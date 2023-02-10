import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { Logger } from './Logger'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Logger />
	</React.StrictMode>
)
