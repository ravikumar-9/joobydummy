import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  console.log(props)

  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-section">
      <Link to="/" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website-logo"
          className="web-logo"
        />
      </Link>
      <ul className="menu-container">
        <Link to="/" className="nav-link">
          <li className="menu-item">Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li className="menu-item">Jobs</li>
        </Link>
      </ul>
      <button className="logout-button" type="button" onClick={onLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
