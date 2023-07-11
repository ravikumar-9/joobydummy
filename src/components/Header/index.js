import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  console.log(props)

  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div className="large-devices">
        <nav className="header-section">
          <Link to="/" className="nav-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
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
      </div>
      <div className="small-devices">
        <nav className="mobile-device-nav-header">
          <Link to="/" className="nav-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="mob-device-web-logo"
              alt="website logo"
            />
          </Link>
          <div className="mob-device-menu-container">
            <Link to="/" className="nav-link">
              <AiFillHome color="white" className="mob-device-home-img" />
            </Link>
            <Link to="/jobs" className="nav-link">
              <BsFillBriefcaseFill
                color="white"
                className="mob-device-home-img"
              />
            </Link>
            <FiLogOut
              color="white"
              className="mob-device-home-img"
              onClick={onLogout}
            />
          </div>
        </nav>
      </div>
    </>
  )
}

export default withRouter(Header)
