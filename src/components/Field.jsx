export const Field = ({ label, value, change, id, type, ...rest }) => (
  <div className='field'>
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      name={id}
      required
      placeholder={label}
      value={value}
      onChange={change}
      {...rest}
    />
  </div>
)
