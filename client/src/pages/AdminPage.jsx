import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { redirect, useLoaderData } from 'react-router-dom'
import styled from 'styled-components'
import StatItem from '../components/StatItem'
import { FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa'

export const loader = async () => {
  try {
    const response = await customFetch.get('/users/admin/app-stats')
    return response.data
  } catch (error) {
    toast.error('You are not authorized to view this page')
    return redirect('/')
  }
}

function AdminPage() {
  const { users, places } = useLoaderData()
  console.log(users)

  return (
    <StyledWrapper>
      <StatItem title='current users' count={users} color={'#50476e'} bcg={'#d3a7f5'} icon={<FaSuitcaseRolling />} />
      <StatItem title='total places' count={places} color={'#1f7f57'} bcg={'#ccece0'} icon={<FaCalendarCheck />} />
    </StyledWrapper>
  )
}
export default AdminPage

const StyledWrapper = styled.div``
