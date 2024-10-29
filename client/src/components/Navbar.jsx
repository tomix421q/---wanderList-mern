import { IoCloseOutline } from 'react-icons/io5'
import Logo from './Logo'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useLayoutContext } from '../pages/LayoutPage'
import styled from 'styled-components'
import LogoutContainer from './LogoutContainer'
import { useLocation } from 'react-router-dom'

function Navbar() {
  const { toggleSidebar, showSidebar } = useLayoutContext()
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  return (
    <StyledWrapper>
      <nav className={isLandingPage ? 'checkPage' : ''}>
        <div className='content-container'>
          <Logo />
          <div className='right-content'>
            <LogoutContainer />
            {showSidebar ? (
              <button type='button' className='close-btn ' onClick={toggleSidebar}>
                <IoCloseOutline size={40} />
              </button>
            ) : (
              <button type='button' onClick={toggleSidebar}>
                <RxHamburgerMenu size={40} />
              </button>
            )}
          </div>
        </div>
      </nav>
    </StyledWrapper>
  )
}
export default Navbar

const StyledWrapper = styled.div`
  position: relative;

  .close-btn {
    transition: var(--transition);
    color: var(--red-dark);
  }
  nav {
    background-color: var(--grey-50);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
  }
  .content-container {
    position: relative;
    width: var(--fluid-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .right-content {
    display: flex;
    align-items: center;
    gap: 0 20px;
  }
  .logo {
    width: 2.75rem;
  }
  .checkPage {
    /* background-color: black; */
  }
  @media (min-width: 992px) {
    /* position: sticky; */
  }
`
