import { Protected, UserUpdater } from 'c'
import useStore from 'h/useStore'

export const Profile = () => {
  const user = useStore(({ user }) => user)
  const userCopy = { ...user }
  delete userCopy.avatar_url

  return (
    <Protected className='page profile'>
      <header className="page-header">
        <h1>Настройки профиля</h1>
      </header>
      <p>Здесь вы можете изменить данные своего аккаунта</p>
      
      <div className='user-data' hidden>
        <pre>{JSON.stringify(userCopy, null, 2)}</pre>
      </div>
      <UserUpdater />
    </Protected>
  )
}
