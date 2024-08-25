import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

import Header from '../Header'
import ProfileContainer from '../ProfileContainer'
import FilterEmployment from '../FilterEmployment'
import FilterSalary from '../FilterSalary'
import JobCard from '../JobCard'

import {AiOutlineSearch} from 'react-icons/ai'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    employeeType: [],
    minimunSalary: 0,
    searchInput: '',
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {employeeType, minimunSalary, searchInput} = this.state
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const url = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join()}&minimum_package=${minimunSalary}&search=${searchInput}`
    const getToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.jobs.map(eachjob => ({
        companyLogoUrl: eachjob.company_logo_url,
        employmentType: eachjob.employment_type,
        id: eachjob.id,
        jobDescription: eachjob.job_description,
        location: eachjob.location,
        packagePerAnnum: eachjob.package_per_annum,
        rating: eachjob.rating,
        title: eachjob.title,
      }))
      this.setState({
        jobsList: formattedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderJobCardList = () => {
    const {jobsList} = this.state
    const renderJobCardList = jobsList.length > 0

    return renderJobCardList ? (
      <ul className='job-list-container'>
        {jobsList.map(eachJob => (
          <JobCard eachJobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      <div className='no-jobs-view-container'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'
          alt='no jobs'
          className='no-jobs-img'
        />
        <h1 className='no-jobs-heading'>No Jobs Found</h1>
        <p className='no-jobs-description'>
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className='loader-container' data-testid='loader'>
      <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
    </div>
  )

  renderfailureView = () => (
    <div className='failure-view-container'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
        alt='failure view'
        className='failure-image'
      />
      <h1 className='failure-heading'>Opps! Something Went Wrong</h1>
      <p className='failure-para'>
        We cannot seem to find the page you are looking for.
      </p>
      <button type='button' data-testid='button' className='retry-button'>
        Retry
      </button>
    </div>
  )

  getEmploymentTypeId = EmploymentIdType => {
    this.setState(
      prevState => ({
        employeeType: [...prevState.employeeType, EmploymentIdType],
      }),
      this.getJobs,
    )
  }

  updateSalaryRange = salary => {
    this.setState({minimunSalary: salary}, this.getJobs)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getJobs)
  }

  onEnterKeySearch = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  renderJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderJobCardList()
      case apiStatusConstant.failure:
        return this.renderfailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    console.log(searchInput)
    return (
      <>
        <Header />
        <div className='job-container'>
          <div className='profile-filters-container'>
            <ProfileContainer />
            <hr className='hr-line' />
            <h1 className='employment-heading'>Type of Employment</h1>
            <ul className='list-employment'>
              {employmentTypesList.map(eachEmployment => (
                <FilterEmployment
                  eachEmploymentDetails={eachEmployment}
                  key={eachEmployment.employmentTypeId}
                  getEmploymentTypeId={this.getEmploymentTypeId}
                />
              ))}
            </ul>
            <hr className='hr-line' />
            <h1 className='employment-heading'>Salary Range</h1>
            <ul className='list-salary'>
              {salaryRangesList.map(eachSalary => (
                <FilterSalary
                  eachSalaryDetails={eachSalary}
                  key={eachSalary.salaryRangeId}
                  updateSalaryRange={this.updateSalaryRange}
                />
              ))}
            </ul>
          </div>
          <div className='job-profile-container'>
            <div className='search-input-container'>
              <button
                className='search-button'
                data-testid='searchButton'
                type='button'
              >
                <input
                  id='userinput'
                  className='search-input'
                  type='search'
                  placeholder='Search'
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onEnterKeySearch}
                  value={searchInput}
                />
                <label htmlFor='userinput' className='label-input'>
                  userinput:
                </label>
              </button>

              <button className='search-button-container' type='button'>
                <AiOutlineSearch className='search-icon' id='userinputicon' />
                <label htmlFor='userinputicon' className='label-input'>
                  userinputicon:
                </label>
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
