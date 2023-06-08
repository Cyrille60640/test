import './Connect.scss'
import { Button, Div, Form, Img, Input } from '../../components/templates'
import { ApiResponse } from '../../components/multiparty'
import { useForm } from 'react-hook-form'
import logo from '../../assets/logo-line.png'
import { authenticateUser } from '../../services'

const Connect = ({ apiResponse }) => {
	// * Déclaration Hook Form:
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		shouldFocusError: true
	})

	return (
		<>
			<Div id={'connect'}>
				<Form onSubmit={handleSubmit(authenticateUser)}>
					<Img src={logo} alt={'Logo Sapée'} />
					<Input
						control={control}
						name={'lastname'}
						className={'connect__input'}
						label={'Nom de famille'}
						rules={{
							required:
								'Vous devez indiquer votre nom de famille.'
						}}
						errors={errors}
					/>
					<Input
						control={control}
						name={'password'}
						type={'password'}
						className={'connect__input'}
						label={'Mot de passe'}
						rules={{
							required: 'Vous devez indiquer votre mot de passe.'
						}}
						errors={errors}
					/>
					<Button type={'submit'} label={'Se connecter'} />
				</Form>
			</Div>
			<ApiResponse apiResponse={apiResponse} />
		</>
	)
}

export default Connect
