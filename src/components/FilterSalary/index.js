import './index.css'

const FilterSalary = props => {
  const {eachSalaryDetails, updateSalaryRange} = props
  const {label, salaryRangeId} = eachSalaryDetails

  const onChangeSalary = event => {
    updateSalaryRange(event.target.value)
  }

  return (
    <li className="list-item" onChange={onChangeSalary}>
      <input type="checkbox" id={salaryRangeId} value={salaryRangeId} />
      <label htmlFor={salaryRangeId} className="label-name">
        {label}
      </label>
    </li>
  )
}

export default FilterSalary
