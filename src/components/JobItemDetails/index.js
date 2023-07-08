import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

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

  renderSpecificJobCard = () => {
    const {specificJobList, similarJobsDataList} = this.state
    console.log(specificJobList)

    console.log(similarJobsDataList)

    /* const {
      title,
      rating,
      location,
      skills,
      companyLogoUrl,
      companyWebsiteUrl,
      jobDescription,
      lifeAtCompany,
    } = specificJobList */
    return <h1>h</h1>
  }

  getSpecificJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

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
    }
    console.log(updatedSpecificJobData)

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
      this.setState(
        {apiStatus: apiStatusConstants.success},
        {specificJobList: updatedSpecificJobData},
        {similarJobsDataList: updatedSimilarJobsData},
      )
    } else if (specificJobResponse.response === 404) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSpecificSwitchCases = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSpecificJobCard()

      default:
        return null
    }
  }

  render() {
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
