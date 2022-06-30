import useStore from 'h/useStore'

const tabs = [
  {
    name: 'My',
    label: 'Мои',
    protected: true
  },
  {
    name: 'New',
    label: 'Создать новую',
    protected: true
  },
  {
    name: 'All',
    label: 'Все'
  }
]

export const PostTabs = ({ tab, setTab }) => {
  const user = useStore(({ user }) => user)

  return (
    <nav className='post-tabs'>
      <ul>
        {tabs.map((t) => {
          const tabId = t.name.toLowerCase()
          if (t.protected) {
            return user ? (
              <li key={tabId}>
                <button
                  className={tab === tabId ? 'active' : ''}
                  onClick={() => setTab(tabId)}
                >
                  {t.label}
                </button>
              </li>
            ) : null
          }
          return (
            <li key={tabId}>
              <button
                className={tab === tabId ? 'active' : ''}
                onClick={() => setTab(tabId)}
              >
                {t.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
