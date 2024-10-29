import styled from 'styled-components'
import landingImage from '../assets/images/landing.jpg'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { useLayoutContext } from './LayoutPage'

function LandingPage() {
  const { user } = useLayoutContext() || {}

  return (
    <StyledWrapper>
      {/* img */}
      <img src={landingImage} alt='landing image' className='img main-img' />
      {/* content */}
      <div className='container page'>
        <div className='info'>
          <h1>
            wander <span>List</span>
          </h1>
          <p>
            Welcome to Wander List! Discover the world of travel with our community of enthusiasts. Wander List is a platform
            where you can share your travel dreams and experiences.
          </p>
          {/* is user login ??? */}
          {user?.name ? (
            <div className='logged-user'>
              <h3>Try add you first place which you plan to visit</h3>
              <Link to={'/add-place'} className='btn'>
                Add place
              </Link>
            </div>
          ) : (
            <div className='btn-container'>
              <Link to={'/register'} className='btn register-link'>
                Register
              </Link>
              <Link to={'/login'} className='btn login-link'>
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  )
}
export default LandingPage

const StyledWrapper = styled.section`
  position: relative;
  .page {
    display: grid;
    align-items: center;
    min-height: 80vh;
  }
  h1 {
    color: var(--primary-50);
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
    margin-bottom: 1.5rem;
    font-size: 5rem;
  }

  p {
    font-family: 'Maven pro';
    line-height: 1.6;
    color: var(--primary-50);
    margin-bottom: 1.5625rem;
    padding: 5px 0.625rem;
    font-size: 1rem;
    display: grid;
    width: 85%;
    background-color: rgba(0, 0, 0, 30%);
  }
  .btn-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: max-content;
    margin: auto;
    margin-top: 40px;
    font-size: 1rem;
  }

  .register-link {
    margin-right: 1rem;
    margin: 0 auto;
  }
  .login-link {
    font-size: 70%;
    text-align: center;
    background: var(--green-light);
    color: black;
    margin: auto;
    padding: 12px 22px !important;
  }
  .main-img {
    position: fixed;
    top: var(--nav-height);
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    filter: brightness(0.4) sepia(0.1) saturate(100%);
  }

  .btn {
    align-items: center;
    border-radius: 20px;
    padding: 15px 30px;
  }
  .hidden {
    display: none;
  }
  .logged-user {
    color: var(--accent-pastel-1);
    max-width: 80%;
    margin: 1.25rem auto;
    font-style: italic;
    display: flex;
    flex-direction: column;
    h3 {
      background-color: rgba(107, 193, 163, 0.4); /* 80% opacity */
      border-radius: var(--border-radius);
      padding: 4px;
      font-weight: 900;
    }
    a {
      transition: var(--transition);
      width: fit-content;
      font-size: 1.5625rem;
      background-color: var(--primary-700);
      margin: 10px auto;
      text-align: center;
      font-weight: 900;
      font-style: italic;
      color: var(--accent-pastel-1);
      @media (min-width: 992px) {
        font-size: 40px;
      }
    }
    a:hover {
      background-color: var(--primary-300);
    }
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    h1 {
      font-size: 14rem;
    }
    p {
      font-size: 1.5rem;
      margin: auto;
    }
    .btn-container {
      flex-direction: row;
      display: flex;
      font-size: 2.5rem;
    }
  }
`
