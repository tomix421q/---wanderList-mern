import { useLoaderData } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { SearchContainer, AllPlaces } from '../components'
import { createContext, useContext } from 'react'
const allPlacesContext = createContext()

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])
    const { data } = await customFetch.get('/places', { params })
    return { data, searchValues: { ...params } }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

function AllMyPlacesPage() {
  const { data, searchValues } = useLoaderData()
  // console.log(data)
  return (
    <allPlacesContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <AllPlaces />
    </allPlacesContext.Provider>
  )
}

export const useAllPlacesContext = () => useContext(allPlacesContext)
export default AllMyPlacesPage
