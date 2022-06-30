import { Link, useNavigate } from 'react-router-dom'
import useStore from 'h/useStore'
import userApi from '../api/user'
import { Loader } from './Loader'

export const Nav = () => {
  const { user, loading, setUser, setLoading, setError } = useStore(
    ({ user, loading, setUser, setLoading, setError }) => ({
      user,
      loading,
      setUser,
      setLoading,
      setError
    })
  )
  const navigate = useNavigate()

  const logout = () => {
    setLoading(true)
    userApi
      .logout()
      .then((user) => {
        setUser(user)
        navigate('/')
      })
      .catch(setError)
  }

  return (
    <nav className='Nav'>
      <ul>
      {user && (
        <>
          <li>
            <Link to='/profile'>
              {user.avatar_url ? (
                loading ? (
                  <Loader width={20} />
                ) : (
                  <figure className='userAvatar'>
                    <img
                      src={user.avatar_url}
                      alt={user.username}
                      className='avatar'
                      title='Изменить профиль'
                    />
                    <figcaption>Изменить профиль</figcaption>
                    <p className='username'>
                      {user.first_name} {user.last_name}
                    </p>
                  </figure>
                )
              ) : (
                'Профиль'
              )}
            </Link>
          </li>
        </>
          )}
        <li>
          <Link to='/'>Главная</Link>
        </li>
        <li>
          <Link to='/blog'>Задачи</Link>
        </li>
        <li>
          <Link to='/about'>Новости</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to='/register'>Регистрация</Link>
            </li>
            <li>
              <Link to='/login'>Войти</Link>
            </li>
          </>
        ) : (
          <>


            <li>
              <a onClick={logout} className='danger'>
                Выйти
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
