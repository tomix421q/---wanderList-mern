import styled from 'styled-components'
import { useLayoutContext } from '../pages/LayoutPage'
import Logo from './Logo'
import links from '../utils/links'
import { NavLink } from 'react-router-dom'
import { useEffect, useRef } from 'react'

function Sidebar() {
  const { showSidebar, toggleSidebar, user } = useLayoutContext()

  //   auto close when click outside container
  const containerRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        if (showSidebar) {
          toggleSidebar()
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSidebar])
  //

  return (
    <StyledWrapper ref={containerRef}>
      <nav className={showSidebar ? 'showSidebar sidebarContainer' : 'closeSidebar sidebarContainer'}>
        <div className='content'>
          <header>
            <Logo />
          </header>
          <div className='nav-links'>
            {links.map((link) => {
              const { text, path, icon } = link
              if (text == 'admin' && user?.role !== 'admin') {
                return null
              }
              return (
                <NavLink to={path} key={text} className='nav-link' onClick={toggleSidebar} end>
                  <span className='icon'>{icon}</span>
                  {text}
                </NavLink>
              )
            })}
          </div>
        </div>
      </nav>
    </StyledWrapper>
  )
}
export default Sidebar

const StyledWrapper = styled.div`
  nav {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--white);
    top: 5rem;
    border-radius: var(--border-radius);
    right: 1rem;
    width: 300px;
    max-width: 70vw;
    max-height: 82vh;
    overflow-y: auto;
    z-index: 3;
    padding: 20px;
    border-top: 5px solid var(--accent-pastel-2);
  }
  header {
    margin: 0 auto;
    margin-bottom: 2.125rem;
  }

  .content {
    display: flex;
    flex-direction: column;
  }
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 8px 0;
  }
  .nav-link {
    display: flex;
    align-items: center;
    gap: 0 10px;
    font-family: 'Maven Pro';
    text-transform: capitalize;
    font-weight: 500;
    padding: 4px 8px;
  }
  .nav-link:hover {
    border-bottom: 1px solid var(--primary-300);
    box-shadow: var(--shadow-4);
    border-radius: var(--border-radius);
  }
  .icon {
    font-size: 1.875rem;
    color: var(--grey-900);
  }
  .logo {
    width: 70px;
  }
  .showSidebar {
    display: block;
    margin-right: 0px;
    transition: var(--transition);
  }
  .closeSidebar {
    margin-right: -500px;
    transition: var(--transition);
  }
  .active {
    background: var(--primary-300);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-4);
  }
`
