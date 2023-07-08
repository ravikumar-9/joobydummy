import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {
    userProfileList: '',
    profileApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.renderUserProfileDetails()
  }

  /* rendering userProfile Details when the jobs route is opened */

  renderUserProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/profile'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)

    const fetchedProfileDetails = await response.json()

    if (response.ok === true) {
      const updatedProfileDetails = {
        name: fetchedProfileDetails.profile_details.name,
        shortBio: fetchedProfileDetails.profile_details.short_bio,
        profileImageUrl:
          fetchedProfileDetails.profile_details.profile_image_url,
      }

      this.setState({
        userProfileList: updatedProfileDetails,
        profileApiStatus: apiStatusConstants.success,
      })

      console.log(updatedProfileDetails)
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileSwitchCases = () => {
    const profileApiStatus = this.status

    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()

      default:
        return null
    }
  }

  render() {
    const {profileApiStatus, userProfileList} = this.state

    console.log(profileApiStatus)
    return (
      <div className="profile-card">
        <img
          src={userProfileList.profileImageUrl}
          className="profile-img"
          alt="profile"
        />
        <h1 className="usr-name">{userProfileList.name}</h1>
        <p className="user-bio">{userProfileList.shortBio}</p>
      </div>
    )
  }
}

export default ProfileDetails
