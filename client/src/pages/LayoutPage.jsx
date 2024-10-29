import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { createContext, useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { Sidebar } from '../components'
import customFetch from '../utils/customFetch'

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user')
    return data
  } catch (error) {
    if (error?.status === 401 || 500) {
      const userQuest = { user: 'quest' }
      return userQuest
    }
  }
}

const LayoutContext = createContext()

function LayoutPage() {
  const navigate = useNavigate()
  const { user } = useLoaderData() || {}

  const [showSidebar, setShowSidebar] = useState(false)

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
    // console.log(showSidebar)
  }
  const logoutUser = async () => {
    await customFetch.get('/auth/logout')
    navigate('/')
    window.location.reload()
  }

  return (
    <LayoutContext.Provider value={{ user, showSidebar, toggleSidebar, logoutUser }}>
      <StyledWrapper>
        <Sidebar />
        <main>
          <Navbar context={{ user }} />
          <div className='layout-page'>
            <Outlet context={{ user }} />
          </div>
        </main>
      </StyledWrapper>
    </LayoutContext.Provider>
  )
}

export const useLayoutContext = () => useContext(LayoutContext)
export default LayoutPage

const StyledWrapper = styled.div`
  .layout-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
    margin-top: var(--nav-height);
  }
  @media (min-width: 992px) {
    .layout-page {
      width: 90%;
      margin-top: var(--nav-height);
    }
  }
`
