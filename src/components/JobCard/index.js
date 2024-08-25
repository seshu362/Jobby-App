import {Link} from 'react-router-dom'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {eachJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJobDetails

  return (
    <Link to={`/jobs/${id}`} className="nav-link">
      <li className="job-list">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
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
        <h1 className="description">Description</h1>
        <p className="description-para">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
