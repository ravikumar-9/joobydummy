import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import JobDetailsCard from '../JobDetailsCard'

import './index.css'

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
      <h1 className="failure-heading">Oops Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the the page you are looking for
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
      <div className="jobs-details-container">
        <div className="input-container">
          <input type="search" className="search-input" />
          <button
            type="button"
            data-testid="searchButton"
            className="search-icon-button"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="jobs-cards-container">
          {this.renderJobsDetailsViews()}
        </div>
      </div>
    )
  }
}

export default JobsDetails
