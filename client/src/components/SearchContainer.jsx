import styled from 'styled-components'
import { useAllPlacesContext } from '../pages/AllMyPlacesPage'
import { Form, Link, useSubmit } from 'react-router-dom'
import FormRow from './form/FormRow'
import FormRowSelect from './form/FormRowSelect'
import { INPERIOD, PLACE_SORT_BY, PLACE_STATUS } from '../../../backend/utils/constants'

function SearchContainer() {
  const { searchValues } = useAllPlacesContext() || {}

  const { search, placeStatus, inPeriod, sort } = searchValues

  const submit = useSubmit()

  const debounce = (onChange) => {
    let timeout
    return (e) => {
      const form = e.currentTarget.form
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        onChange(form)
      }, 1000)
    }
  }

  return (
    <StyledWrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>

        <div className='form-center'>
          <FormRow
            type={'search'}
            name={'search'}
            defaultValue={!search === '' ? search : ''}
            onChange={debounce((form) => {
              submit(form)
            })}
          />
          <FormRowSelect
            labelText={'place status'}
            name={'placeStatus'}
            defaultValue={placeStatus}
            list={['all', ...Object.values(PLACE_STATUS)]}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            labelText={'period'}
            name={'inPeriod'}
            defaultValue={inPeriod}
            list={['all', ...Object.values(INPERIOD)]}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            name={'sort'}
            defaultValue={sort}
            list={[...Object.values(PLACE_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
        </div>
        <button
          type='button'
          className='btn form-btn delete-btn'
          onClick={() => {
            document.querySelector('.form').reset()
            submit(document.querySelector('.form'))
          }}
        >
          Reset search values
        </button>
      </Form>
    </StyledWrapper>
  )
}
export default SearchContainer

const StyledWrapper = styled.div`
  .form-title {
    margin-bottom: 40px;
  }
  @media (min-width: 992px) {
    .form-center {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 0 50px;
    }
    .form {
      min-width: 50rem;
    }
  }
`
