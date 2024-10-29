import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { Form, redirect, useLoaderData, useNavigation } from 'react-router-dom'
import styled from 'styled-components'
import { FormRow, SubmitBtn } from '../components'
import FormRowSelect from '../components/form/FormRowSelect'
import { INPERIOD, PLACE_STATUS } from '../../../backend/utils/constants'
import day from 'dayjs'

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/places/${params.id}`)
    return data
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return redirect('/dashboard/all-myplaces')
  }
}

export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.patch(`/places/${params.id}`, data)
    toast.success('Place edited successfully')
    return redirect('/all-myplaces')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

function EditPlacePage() {
  const { place } = useLoaderData()
  // console.log(place)
  const startDate = day(place.startVisitDate).format('YYYY-MM-DD')
  const endDate = day(place.endVisitDate).format('YYYY-MM-DD')

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <StyledWrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit place</h4>
        <div className='form-center'>
          <FormRow type={'text'} name={'location'} defaultValue={place.location} />
          <FormRow type={'textarea'} name={'description'} defaultValue={place.description} />
          {/* date */}
          <FormRow type={'date'} name={'startVisitDate'} defaultValue={startDate} />
          <FormRow type={'date'} name={'endVisitDate'} defaultValue={endDate} />
          <FormRowSelect
            labelText={'Place status'}
            name={'placeStatus'}
            defaultValue={place.placeStatus}
            list={Object.values(PLACE_STATUS)}
          />
          <FormRowSelect labelText={'Period'} name={'inPeriod'} list={Object.values(INPERIOD)} defaultValue={place.inPeriod} />
          <FormRow type={'text'} name={'tags'} defaultValue={place.tags} />

          {/* submit */}
          <SubmitBtn />
        </div>
      </Form>
    </StyledWrapper>
  )
}
export default EditPlacePage

const StyledWrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--green-light);
  padding: 5px 0px 10px 0px;
  box-shadow: var(--shadow-2);
  .form-title {
    margin-bottom: 2rem;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
`
