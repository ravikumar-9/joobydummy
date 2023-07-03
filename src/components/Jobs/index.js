import {Component} from 'react'

import ProfileDetails from '../ProfileDetails'

import JobsDetails from '../JobsDetails'

import Header from '../Header'

import './index.css'

class Jobs extends Component {
  render() {
    return (
      <div className="jobs-main-container">
        <Header />
        <div className="bottom-section">
          <div className="profile-container">
            <ProfileDetails />
          </div>
          <div className="jobs-container">
            <JobsDetails />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
