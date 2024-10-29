import { useState } from 'react'
import styled from 'styled-components'
import BarChartsComponent from './BarCharts'
import AreaChartComponent from './AreaChart'

function ChartsContainer({ data }) {
  const [barChart, setBarChart] = useState(true)

  return (
    <StyledWrapper>
      <h2>Monthly stats</h2>
      <button className='btn' type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area chart' : 'Bar chart'}
      </button>
      {barChart ? <BarChartsComponent data={data} /> : <AreaChartComponent data={data} />}
    </StyledWrapper>
  )
}
export default ChartsContainer

const StyledWrapper = styled.div`
  h2 {
    margin-top: 100px;
  }
  button {
  }
`
