import customFetch from '../utils/customFetch.js'
import { useLoaderData } from 'react-router-dom'
import { ChartsContainer, StatsContainer } from '../components'

export const loader = async () => {
  try {
    const response = await customFetch.get('/places/stats')
    console.log(response)
    return response.data
  } catch (error) {
    return error
  }
}

function MyStatsPage() {
  const { defaultStats, monthlyApplications } = useLoaderData()

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && <ChartsContainer data={monthlyApplications} />}
    </>
  )
}
export default MyStatsPage
