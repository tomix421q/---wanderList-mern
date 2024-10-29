import { Form, Link, redirect, useNavigation } from 'react-router-dom'
import styled from 'styled-components'
import { FormRow, Logo, SubmitBtn } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/login', data)
    toast.success('Login successful')
    return redirect('../add-place')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

function LoginPage() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <StyledWrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type={'email'} name={'email'} />
        <FormRow type={'password'} name={'password'} />

        <SubmitBtn />
        <button type='button' className='btn btn-block'>
          Try demo
        </button>

        <p>
          Not a member yet?
          <Link to={'/register'} className='member-btn'>
            Register
          </Link>
          <span> |</span>
          <Link to={'/'} className='home-btn'>
            Home
          </Link>
        </p>
      </Form>
    </StyledWrapper>
  )
}
export default LoginPage

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
  .home-btn {
    color: var(--red-dark);
    font-weight: 500;
    margin-left: 0.625rem;
  }
`
