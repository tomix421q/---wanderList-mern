import { useEffect, useRef, useState } from 'react'
import { useLayoutContext } from '../pages/LayoutPage'
import styled from 'styled-components'
import { RxAvatar } from 'react-icons/rx'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { CiLogout } from 'react-icons/ci'
import { Link } from 'react-router-dom'

function LogoutContainer() {
  const [showLogout, setShowLogout] = useState(false)
  const { user, logoutUser } = useLayoutContext() || {}

  //   auto close when click outside container
  const containerRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowLogout(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  //
  return (
    <StyledWrapper ref={containerRef}>
      <button type='button' className='btn logout-btn' onClick={() => setShowLogout(!showLogout)}>
        {user.avatar ? (
          <img src={user.avatar} alt='avatar' className='img'></img>
        ) : (
          <span>
            <RxAvatar size={30} />
          </span>
        )}
        <span className='show-bigDisplay'>{user?.name || user}</span>
        <RiArrowDropDownLine size={30} />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        {user === 'quest' ? (
          <div>
            <Link to={'/login'} className='dropdown-link login'>
              Login
            </Link>
            <Link to={'/register'} className='dropdown-link register'>
              Register
            </Link>
          </div>
        ) : (
          <button type='button' className='dropdown-btn' onClick={logoutUser}>
            <CiLogout size={30} />
            logout
          </button>
        )}
      </div>
    </StyledWrapper>
  )
}
export default LogoutContainer

const StyledWrapper = styled.div`
  position: relative;

  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 1rem;
    height: 35px;
  }
  .img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .dropdown {
    position: absolute;
    top: 45px;
    left: 0;
    width: 135%;
    box-shadow: var(--shadow-1);
    text-align: center;
    visibility: hidden;
    border-radius: var(--border-radius);
    background: transparent;
    padding: 5px;
    height: auto;
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    border-radius: var(--border-radius);
    padding: 0.2rem 1rem;
    margin-top: 4px;
    background-color: var(--grey-700);
    border-color: transparent;
    color: var(--white);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0 13px;
  }
  .dropdown-link {
    border-radius: var(--border-radius);
    padding: 0.6rem 1rem;
    margin-top: 4px;
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    color: var(--grey-900);
    font-family: 'Maven Pro';
    font-weight: 500;
    font-size: large;
  }
  .register {
    background-color: var(--primary-500);
    font-size: 1.3rem;
  }
  .login {
    background-color: var(--primary-200);
    margin-bottom: 10px;
    font-size: 1rem;
  }
  .show-smallDisplay {
    font-family: 'Maven Pro';
    font-weight: 500;
    color: var(--white);
  }
  .show-bigDisplay {
    display: none;
  }
  @media (min-width: 992px) {
    .show-bigDisplay {
      display: flex;
    }
    .dropdown {
      width: 100%;
    }
  }
`
