import {Component} from 'react'

import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'

import {ImLocation} from 'react-icons/im'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {BiLinkExternal} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import SimilarJobsCards from '../SimilarJobsCards'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    specificJobList: [],
    similarJobsDataList: [],
  }

  componentDidMount() {
    this.getSpecificJobDetails()
  }

  getSpecificJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const specificJobResponse = await fetch(url, options)

    const fetchedSpecificJobData = await specificJobResponse.json()
    console.log(fetchedSpecificJobData)

    const updatedSpecificJobData = {
      id: fetchedSpecificJobData.job_details.id,
      companyLogoUrl: fetchedSpecificJobData.job_details.company_logo_url,
      employmentType: fetchedSpecificJobData.job_details.employment_type,
      location: fetchedSpecificJobData.job_details.location,
      rating: fetchedSpecificJobData.job_details.rating,
      title: fetchedSpecificJobData.job_details.title,
      skills: fetchedSpecificJobData.job_details.skills,
      companyWebsiteUrl: fetchedSpecificJobData.job_details.company_website_url,
      jobDescription: fetchedSpecificJobData.job_details.job_description,
      lifeAtCompany: fetchedSpecificJobData.job_details.life_at_company,
      packagePerAnnum: fetchedSpecificJobData.job_details.package_per_annum,
    }
    console.log(fetchedSpecificJobData)

    const updatedSimilarJobsData = fetchedSpecificJobData.similar_jobs.map(
      each => ({
        id: each.id,
        location: each.location,
        title: each.title,
        rating: each.rating,
        jobDescription: each.job_description,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
      }),
    )
    console.log(updatedSimilarJobsData)

    if (specificJobResponse.ok === true) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        specificJobList: updatedSpecificJobData,
        similarJobsDataList: updatedSimilarJobsData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSpecificSuccessView = () => {
    const {specificJobList, similarJobsDataList} = this.state

    const {
      title,
      rating,
      packagePerAnnum,
      companyWebsiteUrl,
      companyLogoUrl,
      location,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
    } = specificJobList

    return (
      <div className="specific-job-summary-card">
        <div className="details-container">
          <div className="company-logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="com-logo"
            />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <AiFillStar color="yellow" height={50} />
                <p className="jobItem-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-salary-container">
            <div className="job-type-container">
              <ImLocation color="white" />
              <p className="location">{location}</p>
              <BsFillBriefcaseFill color="white" />
              <p className="location">{employmentType}</p>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="visit-link">
            <h1 className="description-heading">Description</h1>
            <a href={companyWebsiteUrl} className="company-link">
              Visit <BiLinkExternal className="visit-icon" />
            </a>
          </div>
          <p className="description-text">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-container">
            {skills.map(eachSkill => (
              <li className="skill-container" key={eachSkill.name}>
                <img
                  src={eachSkill.image_url}
                  alt={eachSkill.name}
                  className="skill-img"
                />
                <h1 className="skill-name">{eachSkill.name}</h1>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobsDataList.map(eachSimilarJob => (
            <SimilarJobsCards
              similarJobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  onRetryFetchJobs = () => {
    this.getSpecificJobDetails()
  }

  renderJobsItemsFailureView = () => (
    <div className="failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onRetryFetchJobs}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSpecificSwitchCases = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSpecificSuccessView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      case apiStatusConstants.failure:
        return this.renderJobsItemsFailureView()

      default:
        return null
    }
  }

  render() {
    const {similarJobsDataList} = this.state
    console.log(similarJobsDataList)
    return (
      <div className="specific-job-bg-container">
        <Header />
        <div className="specific-job-container">
          {this.renderSpecificSwitchCases()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
