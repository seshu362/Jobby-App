import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobsList = props => {
  const {eachSimilarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachSimilarJobDetails
  return (
    <li className="similar-job-list">
      <div className="similar-company-logo-container">
        <img
          src={companyLogoUrl}
          className="similar-company-logo"
          alt="similar job company logo"
        />
        <div className="similar-name-container">
          <h1 className="similar-company-name">{title}</h1>
          <div className="similar-rating-container">
            <BsStarFill className="similar-star" />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similar-heading-description-container">
        <h1 className="similar-description">Description</h1>
        <p className="similar-description-para">{jobDescription}</p>
      </div>

      <div className="similar-location-employmentType-container">
        <MdLocationOn className="similar-location-employmentType-logo" />
        <p className="similar-texts">{location}</p>
        <BsFillBriefcaseFill className="similar-location-employmentType-logo" />
        <p className="similar-texts">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobsList
