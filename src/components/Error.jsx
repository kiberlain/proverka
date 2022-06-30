export const Error = ({ error }) => {
  console.error(error)
  const status = error.status || 500
  const message = error.message || 'Что-то пошло не так...'
  const location = window.location.pathname

  return (
    <div className='error'>
      <h2>Что-то пошло не так...</h2>
      <p>Статус: {status}</p>
      <p>Сообщение: {message}</p>
      <p>Место: {location}</p>
      <button onClick={() => {
        window.location.reload()
      }}>Обновить страницу</button>
    </div>
  )
}
