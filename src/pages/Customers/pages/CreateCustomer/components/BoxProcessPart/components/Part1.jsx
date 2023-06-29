import { Button, Input } from '../../../../../../../components/templates'

const Part1 = ({ control, errors, setPart }) => {
	return (
		<>
			<Input
				control={control}
				name={'articleCode'}
				className={''}
				label={'Code Article'}
				rules={null}
				errors={errors}
			/>
			<Button label={'Suivant'} onClick={() => setPart(2)} />
		</>
	)
}

export default Part1
