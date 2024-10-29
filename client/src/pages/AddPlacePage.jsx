import { Form, redirect, useNavigation } from 'react-router-dom'
import { useLayoutContext } from './LayoutPage'
import styled from 'styled-components'
import { FormRow, SubmitBtn } from '../components'
import FormRowSelect from '../components/form/FormRowSelect'
import { INPERIOD, PLACE_STATUS } from '../../../backend/utils/constants'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/places', data)
    toast.success('Place added successfully')
    return redirect('../all-myplaces')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

function AddPlacePage() {
  // const { user } = useLayoutContext() || {}
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <StyledWrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Add place</h4>
        <div className='form-center'>
          <FormRow type={'text'} name={'location'} />
          <FormRow type={'textarea'} name={'description'} />
          <FormRow type={'date'} name={'startVisitDate'} />
          <FormRow type={'date'} name={'endVisitDate'} />
          <FormRowSelect
            labelText={'Place status'}
            name={'placeStatus'}
            defaultValue={PLACE_STATUS.SOON}
            list={Object.values(PLACE_STATUS)}
          />
          <FormRowSelect labelText={'Period'} name={'inPeriod'} list={Object.values(INPERIOD)} />
          <FormRow type={'text'} name={'tags'} />
        </div>
        <SubmitBtn />
      </Form>
    </StyledWrapper>
  )
}
export default AddPlacePage

const StyledWrapper = styled.div`
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
