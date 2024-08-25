import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Cookies from 'js-cookie'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileContainer extends Component {
  state = {
    profileList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        profileList: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileDetails = () => {
    const {profileList} = this.state
    const {name, profileImageUrl, shortBio} = profileList
    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="profile-logo" alt="profile" />
        <h1 className="name">{name}</h1>
        <p className="text">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <button
        type="button"
        id="button"
        className="retry-button"
        onClick={this.getProfileDetails}
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

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default ProfileContainer
