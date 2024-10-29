import styled from 'styled-components'

function FormRow({ type, name, labelText, defaultValue, extraData, onChange }) {
  return (
    <StyledWrapper className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      {type === 'textarea' ? (
        <textarea type={type} id={name} name={name} defaultValue={defaultValue} required className='form-input' />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          defaultValue={defaultValue || ''}
          required
          className='form-input'
          onChange={onChange}
        />
      )}

      <span>{extraData}</span>
    </StyledWrapper>
  )
}
export default FormRow

const StyledWrapper = styled.div`
  span {
    font-size: 0.8rem;
    color: var(--red-dark);
  }
  textarea {
    min-height: 150px;
  }
`
