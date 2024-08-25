import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => this.setState({username: event.target.value})
  onChangePassword = event => this.setState({password: event.target.value})
  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = mssgError =>
    this.setState({showSubmitError: true, errorMsg: mssgError})

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const getToken = Cookies.get('jwt_token')

    if (getToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <div className="input-container">
            <label className="label-name" htmlFor="nameuser">
              USERNAME
            </label>
            <input
              className="user-input"
              id="nameuser"
              type="text"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label className="label-password" htmlFor="passworduser">
              PASSWORD
            </label>
            <input
              className="user-password-input"
              id="passworduser"
              type="password"
              value={password}
              placeholder="password"
              onChange={this.onChangePassword}
            />
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
