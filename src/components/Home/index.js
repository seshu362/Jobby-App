import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <div className="home-container">
          <Header />
          <h1 className="heading">
            Find The Job That <br /> Fits Your Life
          </h1>
          <p className="para">
            Millions of people are searching for jobs, salary <br />
            information, company reviews. Find the job that fits your <br />
            abilities and potential
          </p>
          <Link to="/jobs">
            <button type="button" className="findJob-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </>
    )
  }
}

export default Home
