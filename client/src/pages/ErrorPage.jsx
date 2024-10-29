import { Link, useRouteError } from 'react-router-dom'
import error404 from '../assets/images/404.jpg'
import styled from 'styled-components'

function ErrorPage() {
  const error = useRouteError()
  console.log(error)
  if (error.status === 404) {
    return (
      <StyledWrapper>
        <div>
          <img src={error404} alt='not found' />
          <h1>Page not found</h1>
          <p>We cant seem to find the page are you looking for.</p>
          <Link to={'./'}>Back home</Link>
        </div>
      </StyledWrapper>
    )
  }
  return (
    <StyledWrapper>
      <section>
        <h2>Error</h2>
        <p>{error.message}</p>
      </section>
    </StyledWrapper>
  )
}
export default ErrorPage

const StyledWrapper = styled.div`
  background: #ffffff;
  div {
    min-height: 100vh;
    margin: 0 1.875rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 2;
    text-align: center;
  }
  img {
    margin: 0 auto;
  }
  h1 {
    font-size: 10.5rem;
    font-family: 'Maven Pro';
    color: var(--red-dark);
    font-weight: 700;
    margin-top: -9.375rem;
  }
  p {
    font-size: 10px;
    font-size: 2rem;
    max-width: 700px;
  }
  a {
    color: #ccece0;
    font-size: 3rem;
    background: var(--grey-900);
    border-radius: var(--border-radius);
    padding: 0 1.875rem;
  }
  a:hover {
    background: var(--green-dark);
    transition: var(--transition);
  }
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    h2 {
      color: var(--red-dark);
    }
  }

  @media (min-width: 992px) {
    img {
      height: 80vh;
    }
    h1 {
      font-size: 3.875rem;
    }
  }
`
