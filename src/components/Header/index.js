import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
          className="img-logo"
        />
      </Link>

      <ul className="nav-heading-container">
        <Link to="/" className="nav-link">
          <li className="nav-heading">Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li className="nav-heading">Jobs</li>
        </Link>
      </ul>
      <li className="list-type">
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </div>
  )
}

export default withRouter(Header)
