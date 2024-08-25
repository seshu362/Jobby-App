import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import SkillCard from '../SkillCard'
import SimilarJobsList from '../SimilarJobsList'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class DetailsJobItem extends Component {
  state = {
    jobDataDetails: {},
    similarJobsData: [],
    apiStatus: apiStatusConstant.initial,
  }
  componentDidMount() {
    this.getJobItemDetails()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const getToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const jobDataDetailsFormattedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        lifeAtCompanyDescription: data.job_details.life_at_company.description,
        lifeAtCompanyImageUrl: data.job_details.life_at_company.image_url,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills: data.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
      }

      const similarJobsFormattedData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedData(eachSimilarJob),
      )

      this.setState({
        jobDataDetails: jobDataDetailsFormattedData,
        similarJobsData: similarJobsFormattedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderLoadingView = () => (
    <>
      <Header />
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderfailureView = () => (
    <>
      <Header />
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-para">
          We cannot seem to find the page you are looking for.
        </p>
        <button className="retry-button" onClick={this.getJobItemDetails} type="button">
          Retry
        </button>
      </div>
    </>
  )

  renderJobItemDetails = () => {
    const {jobDataDetails, similarJobsData} = this.state
    console.log(similarJobsData)
    const {
      skills,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
      packagePerAnnum,
      rating,
      title,
    } = jobDataDetails

    return (
      <>
        <Header />
        <div className="job-item-details-container">
          <div className="job-item-container">
            <div className="company-logo-container">
              <img
                src={companyLogoUrl}
                className="company-logo"
                alt="job details company logo"
              />
              <div className="name-container">
                <h1 className="company-name">{title}</h1>
                <div className="rating-container">
                  <BsStarFill className="star" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-salary-employmentType-container">
              <div className="location-employmentType-container">
                <MdLocationOn className="location-employmentType-logo" />
                <p className="texts">{location}</p>
                <BsFillBriefcaseFill className="location-employmentType-logo" />
                <p className="texts">{employmentType}</p>
              </div>
              <p className="salary-text">{packagePerAnnum}</p>
            </div>
            <hr className="hr-line" />
            <div className="description-para-card-container">
              <div className="description-Visit-container">
                <h1 className="description">Description</h1>
                <div className="visit-container">
                  <a href={companyWebsiteUrl} className="visit-heading">
                    Visit
                  </a>
                  <BiLinkExternal className="link-icon" />
                </div>
              </div>
              <p className="description-para">{jobDescription}</p>
            </div>
            <h1 className="skills-description">Skills</h1>
            <ul className="skills-container">
              {skills.map(eachSkill => (
                <SkillCard skillsDetails={eachSkill} key={eachSkill.name} />
              ))}
            </ul>
            <h1 className="Life-at-Company-heading">Life at Company</h1>
            <div className="life-at-company-container">
              <p className="life-at-company-description">
                {lifeAtCompanyDescription}
              </p>
              <img
                src={lifeAtCompanyImageUrl}
                className="life-at-company-img"
                alt="Life at company"
              />
            </div>
          </div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-job-container">
            {similarJobsData.map(eachSimilarJob => (
              <SimilarJobsList
                eachSimilarJobDetails={eachSimilarJob}
                key={eachSimilarJob.id}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderJobItemDetails()
      case apiStatusConstant.failure:
        return this.renderfailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default DetailsJobItem
