import {Link} from 'react-router-dom'

import './index.css'

import {AiFillStar} from 'react-icons/ai'

import {ImLocation} from 'react-icons/im'

import {BsFillBriefcaseFill} from 'react-icons/bs'

const JobDetailsCard = props => {
  const {summary} = props

  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = summary

  return (
    <Link to={`jobs/${id}`} className="nav-link">
      <li className="job-summary-card">
        <div className="details-container">
          <div className="company-logo-container">
            <img src={companyLogoUrl} alt="company logo" className="com-logo" />
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
          <h1 className="description-heading">Description</h1>
          <p className="description-text">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobDetailsCard
