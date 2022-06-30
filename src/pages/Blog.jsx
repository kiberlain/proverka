import postApi from 'a/post'
import { Form, PostList, PostTabs, Protected } from 'c'
import useStore from 'h/useStore'
import { useEffect, useState } from 'react'

const fields = [
  {
    id: 'section',
    label: 'Раздел (выберите существующий раздел или создайте новый)',
    type: 'text',
    tag: 'text_input'
  },
  {
    id: 'title',
    label: 'Название поста',
    type: 'text',
    tag: 'text_input'
  },
  {
    id: 'content',
    label: 'Внесите информацию для запоминания',
    type: 'text',
    tag: 'textarea'
  }
]



export const Blog = () =>
{
  const { user, allPostsWithCommentCount, postsByUser, setLoading, setError } =
    useStore(
      ({
        user,
        allPostsWithCommentCount,
        postsByUser,
        setLoading,
        setError
      }) => ({
        user,
        allPostsWithCommentCount,
        postsByUser,
        setLoading,
        setError
      })
    )
  const [_posts, setPosts] = useState([])
  const [tab, setTab] = useState('all')

  const create = (data) =>
  {
    setLoading(true)
    postApi
      .create(data)
      .then(() =>
      {
        setTab('my')
      })
      .catch(setError)
  }

  useEffect(() =>
  {
    if (tab === 'new') return
    const _posts =
      tab === 'my' ? postsByUser[user.id] : allPostsWithCommentCount
    setPosts(_posts)
  }, [tab, allPostsWithCommentCount])

  if (tab === 'new')
  {
    return (
      <Protected className='page new-post'>
        <header className="page-header">
          <h1>Новая задача</h1>
          <PostTabs tab={tab} setTab={setTab} />
        </header>
        <Form fields={fields} submit={create} button='Добавить' />
      </Protected>
    )
  }

  return (
    <div className='page blog'>
      <header className="page-header">
        <h1>{tab === 'my' ? 'Мои' : 'Все'} задачи</h1>
        <PostTabs tab={tab} setTab={setTab} />
      </header>
      <PostList posts={_posts} />
    </div>
  )
}
