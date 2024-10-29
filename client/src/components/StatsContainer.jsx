import { FaWindowRestore } from 'react-icons/fa'
import { MdAgriculture, MdStayPrimaryLandscape, MdSummarize } from 'react-icons/md'
import styled from 'styled-components'
import StatItem from './StatItem'

function StatsContainer({ defaultStats }) {
  const stats = [
    { title: 'summer', count: defaultStats?.summer || 0, icon: <MdSummarize />, color: '#f9d6d7' },
    { title: 'winter', count: defaultStats?.winter || 0, icon: <FaWindowRestore />, color: '#fbfbfb' },
    { title: 'autumn', count: defaultStats?.autumn || 0, icon: <MdAgriculture />, color: '#f8b88b' },
    { title: 'spring', count: defaultStats?.spring || 0, icon: <MdStayPrimaryLandscape />, color: '#d3a7f5' },
  ]
  return (
    <StyledWrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />
      })}
    </StyledWrapper>
  )
}
export default StatsContainer

const StyledWrapper = styled.div``
