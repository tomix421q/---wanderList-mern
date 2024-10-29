import styled from 'styled-components'
import { useAllPlacesContext } from '../pages/AllMyPlacesPage'
import Place from './Place'
import PageBtnContainer from './pagination/PageBtnContainer'

function AllPlaces() {
  const { data } = useAllPlacesContext()
  const { places, totalPlaces, numOfPages } = data

  if (places.length === 0) {
    return (
      <StyledWrapper>
        <h2>You dont't have place to display...</h2>
      </StyledWrapper>
    )
  }

  return (
    <StyledWrapper>
      <h5 className='num-found'>
        Found <span>{totalPlaces}</span> place{places.length > 1 && 's'}
      </h5>
      <div className='places'>
        {places.map((place) => {
          return <Place key={place._id} {...place} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </StyledWrapper>
  )
}
export default AllPlaces

const StyledWrapper = styled.div`
  max-width: var(--max-width);
  margin: 4rem auto;
  .num-found {
    margin-bottom: 1.25rem;
    font-weight: 300;
    color: var(--grey-500);
    span {
      color: var(--accent-dark-2);
      font-weight: 800;
    }
  }
  h2 {
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .places {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 1120px) {
    .places {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
  @media (min-width: 1980px) {
    .places {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 3rem;
    }
  }
`
