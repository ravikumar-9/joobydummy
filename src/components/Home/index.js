import {withRouter, Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = props => {
  const onNavigateToJobsRoute = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="bg-container">
      <Header />
      <div className="home-section-container">
        <h1 className="home-section-heading">
          Find The Job That
          <br />
          Fits Your Life
        </h1>
        <p className="home-section-description">
          Millions of people are searching for jobs,salary
          <br />
          information,company reviews.Find the job that fits your
          <br />
          abilities and potential.
        </p>
        <Link to="/jobs" className="nav-link">
          <button
            type="button"
            className="find-jobs-button"
            onClick={onNavigateToJobsRoute}
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default withRouter(Home)
