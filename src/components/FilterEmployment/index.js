import './index.css'

const FilterEmployment = props => {
  const {eachEmploymentDetails, getEmploymentTypeId} = props
  const {label, employmentTypeId} = eachEmploymentDetails

  const onChangeEmploymentType = event => {
    getEmploymentTypeId(event.target.value)
  }

  return (
    <li className="list-item" onChange={onChangeEmploymentType}>
      <input type="checkbox" id={employmentTypeId} value={employmentTypeId} />
      <label htmlFor={employmentTypeId} className="label-name">
        {label}
      </label>
    </li>
  )
}

export default FilterEmployment
