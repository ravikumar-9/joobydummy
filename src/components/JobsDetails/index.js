import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import JobDetailsCard from '../JobDetailsCard'

import ProfileDetails from '../ProfileDetails'

import FiltersGroup from '../FiltersGroup'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsDetails extends Component {
  state = {
    jobsApiStatus: apiStatusConstants.initial,
    jobsDetailsList: [],
    employmentType: '',
    minimumPackage: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {employmentType, minimumPackage, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    const fetchedJobDetails = await response.json()

    if (response.ok === true) {
      const updatedJobsDetailsList = fetchedJobDetails.jobs.map(each => ({
        id: each.id,
        title: each.title,
        rating: each.rating,
        companyLogoUrl: each.company_logo_url,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        employmentType: each.employment_type,
      }))
      this.setState({
        jobsDetailsList: updatedJobsDetailsList,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  onRetryFetch = () => {
    this.getJobDetails()
  }

  renderJobsDetailsCards = () => {
    const {jobsDetailsList} = this.state

    console.log(jobsDetailsList[0])
    if (jobsDetailsList.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-image"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-description">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }

    return jobsDetailsList.map(eachJobItem => (
      <JobDetailsCard summary={eachJobItem} key={eachJobItem.id} />
    ))
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsDetailsFailureView = () => (
    <div className="failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onRetryFetch}
      >
        Retry
      </button>
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
    return null
  }

  onChangeEmploymentType = value => {
    this.setState({employmentType: value}, this.getJobDetails())
  }

  renderJobsDetailsViews = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsDetailsCards()

      case apiStatusConstants.failure:
        return this.renderJobsDetailsFailureView()

      case apiStatusConstants.inProgress:
        return this.renderLoaderView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="profile-container">
          <ProfileDetails />
          <FiltersGroup
            salaryRangesList={salaryRangesList}
            employmentTypesList={employmentTypesList}
            onChangeEmploymentType={this.onChangeEmploymentType}
            onChangeSalaryRanges={this.onChangeSalaryRanges}
          />
        </div>

        <div className="jobs-details-container">
          <div className="input-container">
            <input
              type="search"
              className="search-input"
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-icon-button"
              onClick={this.onEnterSearchInput}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="jobs-cards-container">
            {this.renderJobsDetailsViews()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsDetails
