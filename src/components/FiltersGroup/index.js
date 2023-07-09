import './index.css'

const FiltersGroup = props => {
  const {onChangeEmploymentType, onChangeSalaryRanges} = props

  const renderEmploymentOptions = () => {
    const {employmentTypesList} = props

    console.log(employmentTypesList)

    return employmentTypesList.map(each => {
      const onClickEmploymentType = event => {
        onChangeEmploymentType(event.target.value)
      }

      return (
        <li className="options-container" key={each.employmentTypeId}>
          <input
            type="checkbox"
            value={each.employmentTypeId}
            key={each.employmentTypeId}
            id={each.employmentTypeId}
            className="radio-button"
            onChange={onClickEmploymentType}
          />
          <label
            htmlFor={each.employmentTypeId}
            value={each.employmentTypeId}
            className="salary-label"
          >
            {each.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRangeOptions = () => {
    const {salaryRangesList} = props
    console.log(salaryRangesList)
    return salaryRangesList.map(each => {
      const onChangeSalary = event => {
        onChangeSalaryRanges(event.target.value)
      }
      return (
        <li className="options-container" key={each.salaryRangeId}>
          <input
            type="radio"
            value={each.salaryRangeId}
            key={each.salaryRangeId}
            id={each.salaryRangeId}
            className="radio-button"
            onClick={onChangeSalary}
            name="salary"
          />
          <label
            htmlFor={each.salaryRangeId}
            value={each.salaryRangeId}
            className="salary-label"
          >
            {each.label}
          </label>
        </li>
      )
    })
  }

  return (
    <div className="filters-container">
      <hr className="horizontal-line" />
      <h1 className="type-employment-heading">Type of Employment</h1>
      <ul className="type-of-options-container">{renderEmploymentOptions()}</ul>
      <hr className="horizontal-line" />
      <h1 className="type-employment-heading">Salary Range</h1>
      <ul className="type-of-options-container">
        {renderSalaryRangeOptions()}
      </ul>
    </div>
  )
}

export default FiltersGroup
