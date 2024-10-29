import { Form, useNavigation, useOutletContext } from 'react-router-dom'
import styled from 'styled-components'
import { FormRow, SubmitBtn } from '../components'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const file = formData.get('avatar')

  if (file && file.size > 500000) {
    toast.error('Image size too large')
    return null
  }

  try {
    await customFetch.patch('/users/update-user', formData)
    toast.success('Profile updated successfully')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
  }
  return null
}

function ProfilePage() {
  const { user } = useOutletContext()
  const { name, lastName, email, location, avatar } = user
  const navigation = useNavigation()

  return (
    <StyledWrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <div className='form-title'>
          <h3>profile</h3>
          <div>
            <img src={avatar} alt='avatar' className='img' />
          </div>
        </div>

        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='image' className='form-label'>
              Select an image file (max 0.5 MB):
            </label>
            <input type='file' id='avatar' name='avatar' className='form-input' accept='image/*' />
          </div>
          <FormRow type={'text'} name={'name'} defaultValue={name} />
          <FormRow type={'text'} labelText={'last name'} name={'lastName'} defaultValue={lastName} />
          <FormRow type={'email'} name={'email'} defaultValue={email} />
          <FormRow type={'text'} name={'location'} defaultValue={location} />
          <SubmitBtn />
        </div>
      </Form>
    </StyledWrapper>
  )
}
export default ProfilePage

const StyledWrapper = styled.div`
  .form-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
  }
  .img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 30px;
  }
`
