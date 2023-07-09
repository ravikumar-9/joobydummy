import {AiFillStar} from 'react-icons/ai'

import {ImLocation} from 'react-icons/im'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobsCards = props => {
  console.log(props)

  const {similarJobDetails} = props

  const {
    title,
    rating,
    jobDescription,
    location,
    companyLogoUrl,
    employmentType,
  } = similarJobDetails

  return (
    <li className="similar-job-card">
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
        <h1 className="description-heading">Description</h1>
        <p className="similar-job-description-text">{jobDescription}</p>
        <div className="similar-job-location-type-container">
          <ImLocation color="white" />

          <p className="location">{location}</p>
          <BsFillBriefcaseFill color="white" />
          <p className="location">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsCards
