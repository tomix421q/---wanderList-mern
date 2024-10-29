import { Form, Link, redirect, useNavigation } from 'react-router-dom'
import { Logo, FormRow, SubmitBtn } from '../components'
import styled from 'styled-components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/register', data)
    toast.success('Registration successful')
    return redirect('/login')
  } catch (error) {
    console.log(error?.response?.data?.msg)
    toast.error(error?.response?.data?.msg)
    return error
  }
}

function RegisterPage() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <StyledWrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <div className='form-row'>
          <FormRow type={'text'} name={'name'} />
          <FormRow type={'text'} name={'lastName'} labelText={'last name'} />
          <FormRow type={'text'} name={'location'} />
          <FormRow type={'email'} name={'email'} />
          <FormRow type={'password'} name={'password'} />
        </div>

        <SubmitBtn />
        <p>
          Already a member?
          <Link to={'/login'} className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </StyledWrapper>
  )
}
export default RegisterPage

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  align-items: center;
  font-family: 'Maven Pro';
  .logo {
    width: 3.75rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--accent-pastel-2);
  }
  h4 {
    font-size: 3.125rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 1.875rem;
  }
  p {
    margin-top: 1.5rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-700);
    font-weight: 500;
    margin-left: 0.625rem;
  }
`
