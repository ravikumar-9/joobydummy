import './index.css'

const FiltersGroup = props => {
  const {onChangeEmploymentType} = props

  const onClickEmploymentType = event => {
    onChangeEmploymentType(event.target.value)
  }

  const renderEmploymentOptions = () => {
    const {employmentTypesList} = props

    console.log(employmentTypesList)

    return employmentTypesList.map(each => (
      <li className="options-container" key={each.employmentTypeId}>
        <input
          type="checkbox"
          value={each.employmentTypeId}
          key={each.employmentTypeId}
          id={each.employmentTypeId}
          className="radio-button"
          onClick={onClickEmploymentType}
        />
        <label
          htmlFor={each.employmentTypeId}
          value={each.employmentTypeId}
          className="salary-label"
        >
          {each.label}
        </label>
      </li>
    ))
  }

  const renderSalaryRangeOptions = () => {
    const {salaryRangesList} = props
    console.log(salaryRangesList)
    return salaryRangesList.map(each => (
      <li className="options-container" key={each.salaryRangeId}>
        <input
          type="radio"
          value={each.salaryRangeId}
          key={each.salaryRangeId}
          id={each.salaryRangeId}
          className="radio-button"
        />
        <label
          htmlFor={each.salaryRangeId}
          value={each.salaryRangeId}
          className="salary-label"
        >
          {each.label}
        </label>
      </li>
    ))
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
