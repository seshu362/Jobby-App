import {Component} from 'react'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="notFound-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png "
          className="img-notfound"
          alt="notfound"
        />
        <h1 className="notfound-heading">Page Not Found</h1>
        <p className="notfound-para">
          We are sorry, the page you requested could not be found
        </p>
      </div>
    )
  }
}

export default NotFound
