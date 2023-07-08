import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', onSubmitError: false, errorMessage: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMessage: errorMsg, onSubmitError: true})
  }

  onSubmitFormData = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, onSubmitError, errorMessage} = this.state

    const isActiveError = onSubmitError ? errorMessage : null

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="login-form" onSubmit={this.onSubmitFormData}>
            <label htmlFor="name" className="label-name">
              USERNAME
            </label>
            <input
              type="text"
              className="name-input"
              onChange={this.onChangeUserName}
              value={username}
              id="name"
            />
            <label htmlFor="password" className="label-name">
              PASSWORD
            </label>
            <input
              type="password"
              className="name-input"
              onChange={this.onChangePassword}
              value={password}
              id="password"
            />
            <button type="submit" className="login-button">
              Login
            </button>
            <p className="error-message">{isActiveError}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
