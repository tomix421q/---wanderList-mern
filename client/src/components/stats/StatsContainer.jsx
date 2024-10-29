import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa'
import { RiSparkling2Fill } from 'react-icons/ri'
import styled from 'styled-components'

function StatsContainer({ defaultStats }) {
  const stats = [
    {
      title: 'summer trip',
      count: defaultStats?.summer || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title: 'winter trip',
      count: defaultStats?.winter || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'spring trip',
      count: defaultStats?.spring || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: 'autumn trip',
      count: defaultStats?.autumn || 0,
      icon: <RiSparkling2Fill />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]
  return (
    <StyledWrapper>
      <h1 className='title'>Your stats:</h1>
      <div className='section'>
        {stats.map((item) => {
          return (
            <div className='stats' key={item.title}>
              <h2 className='stats-title'>{item.title}</h2>
              <div className='count' style={{ color: item.color }}>
                <span>{item.icon}</span>
                <span>{item.count}</span>
              </div>
            </div>
          )
        })}
      </div>
    </StyledWrapper>
  )
}
export default StatsContainer

const StyledWrapper = styled.div`
  display: grid;
  .title {
    font-weight: 900;
    color: var(--primary-500);
    margin-bottom: 30px;
    border-bottom: 3px solid var(--grey-200);
  }
  .stats {
    background-color: var(--primary-200);
    border-radius: var(--border-radius);
    padding: 40px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .stats-title {
    font-weight: 700;
    font-family: 'Maven Pro';
  }
  .count {
    display: flex;
    justify-content: space-between;
    font-size: 6.25rem;
    padding: 20px;
    border-radius: var(--border-radius);
    margin: 10px 0;
  }
  @media (min-width: 992px) {
    .title {
      margin-bottom: 50px;
    }
    .section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
    }
    .count {
      font-size: 10rem;
      width: fit-content;
      gap: 40px;
      display: flex;
      justify-content: space-between;
    }
  }
`
