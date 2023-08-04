import { Row, Col } from 'react-bootstrap'
import { Select } from '../../../../../components/templates'
import { Controller } from 'react-hook-form'

const Selects = ({ selectsToShow, control, handleChange }) => {
	return (
		<Row className="mx-0">
			{selectsToShow.map((select) => {
				return (
					<Col key={select.name} xs={5} md={4}>
						<Controller
							control={control}
							name={select.name}
							rules={{ required: select.name !== 'subCategory' }}
							render={({
								field: { onChange, onBlur, value, ref }
							}) => (
								<Select
									name={select.name}
									options={select.options}
									onChange={(value) => {
										onChange(value)
										handleChange()
									}}
									placeholder={select.placeholder}
									className="text-center my-3"
									value={value}
								/>
							)}
						/>
					</Col>
				)
			})}
		</Row>
	)
}

export default Selects
