import day from 'dayjs'
import { CiCalendar, CiLocationArrow1 } from 'react-icons/ci'
import { GrStatusCritical, GrStatusInfo } from 'react-icons/gr'
import { Form, Link } from 'react-router-dom'
import styled from 'styled-components'

function Place({ _id, createdAt, description, endVisitDate, startVisitDate, inPeriod, location, placeStatus, tags }) {
  const createDate = day(createdAt).format('MMM D, YYYY')
  const startDate = day(startVisitDate).format('DD/MM/YYYY')
  const endDate = day(endVisitDate).format('DD/MM/YYYY')

  return (
    <StyledWrapper>
      <header>
        <div className='location'>
          <CiLocationArrow1 size={25} />
          <h4>{location}</h4>
        </div>
        <div className='date-info'>
          <p>
            <CiCalendar size={25} /> <span>{startDate}</span>
          </p>
          <p>
            <CiCalendar size={25} /> <span>{endDate}</span>
          </p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <div>
            <div className='place-status'>
              When : <span className={placeStatus}>{placeStatus}</span>
            </div>
            <div className='period'>
              Period : <span>{inPeriod}</span>
            </div>
          </div>

          <div className='created-tags'>
            <p>{createDate}</p>
            <p>Tags: {tags}</p>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <footer>
        <Link to={`../edit-place/${_id}`} className='btn edit-btn'>
          Edit
        </Link>
        <Form method='post' action={`../delete-place/${_id}`}>
          <button type='submit' className='btn delete-btn'>
            Delete
          </button>
        </Form>
      </footer>
    </StyledWrapper>
  )
}
export default Place

const StyledWrapper = styled.section`
  background: var(--primary-100);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: var(--shadow-3);
  padding: 1rem;
  grid-gap: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);
  &:hover {
    background-color: var(--primary-200);
  }
  svg {
    color: var(--primary-600);
  }
  .location {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    text-transform: uppercase;
    margin-bottom: 5px;
    border-bottom: 1px solid var(--grey-600);
    h4 {
      font-weight: 700;
      letter-spacing: 2px;
      font-size: larger;
    }
  }
  .date-info {
    p {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-style: italic;
      font-weight: 500;
    }
  }
  .content-center {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 130%;
    margin-top: 10px;
  }
  .place-status {
    font-size: 1rem;
    margin-bottom: 5px;
    font-weight: 500;
  }
  .period {
    font-size: 1.5rem;
    font-weight: 500;
    span {
      color: var(--accent-dark-1);
      font-weight: 800;
    }
  }
  footer {
    display: flex;
    gap: 20px;
    justify-content: center;
  }
  .created-tags {
    font-size: 0.8rem;
    color: var(--grey-400);
  }
  @media (min-width: 992px) {
    .place-status {
      font-size: 1.5rem;
    }
  }
`
