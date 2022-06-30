import postApi from 'a/post'
import commentApi from 'a/comment'
import { Form, Protected, CommentList } from 'c'
import useStore from 'h/useStore'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { VscEdit, VscTrash } from 'react-icons/vsc'

const createCommentFields = [
  {
    id: 'content',
    label: 'Комментарий',
    type: 'text'
  }
]

export const Post = () =>
{
  const { user, setLoading, setError, postsById, removePost } = useStore(
    ({ user, setLoading, setError, postsById, removePost }) => ({
      user,
      setLoading,
      setError,
      postsById,
      removePost
    })
  )
  const { id } = useParams()
  const { search } = useLocation()
  const edit = new URLSearchParams(search).get('edit')
  const post = postsById[id]
  const navigate = useNavigate()

  const updatePost = (data) =>
  {
    setLoading(true)
    data.id = post.id
    postApi
      .update(data)
      .then(() =>
      {
        navigate(`/blog/post/${post.id}`)
      })
      .catch(setError)
  }

  const createComment = (data) =>
  {
    setLoading(true)
    data.post_id = post.id
    commentApi.create(data).catch(setError)
  }

  if (edit)
  {
    const editPostFields = [
      {
        id: 'section',
        label: 'Раздел',
        type: 'text',
        tag: 'text_input',
        value: post.section
      },
      {
        id: 'title',
        label: 'Название задачи',
        type: 'text',
        tag: 'text_input',
        value: post.title
      },
      {
        id: 'content',
        label: 'Текст',
        type: 'text',
        tag: 'textarea',
        value: post.content
      }
    ]

    return (
      <Protected>
        <h2>Редактирование задачи</h2>
        <Form fields={editPostFields} submit={updatePost} button='Сохранить' />
      </Protected>
    )
  }

  return (
    <article className='article'>
      {post && (
        <>
          <header className="article-header">
            <h1 className='article-title'>
              {post.title}
            </h1>
            <small className='article-date'>Время последнего изменения {new Date(post.created_at).toLocaleString()}</small>
            {post.editable ? (
              <div className='article-actions'>
                <button
                  onClick={() =>
                  {
                    navigate(`/blog/post/${post.id}?edit=true`)
                  }}
                  className='info'
                  title="Изменить"
                >
                  <VscEdit />
                </button>
                <button
                  onClick={() =>
                  {
                    removePost(post.id)
                    navigate('/blog')
                  }}
                  className='danger'
                  title="Удалить"
                >
                  <VscTrash />
                </button>
              </div>
            ) : (
              <p>Автор: {post.author}</p>
            )}

          </header>
          <div className='article-content'>{post.content}</div>
          <section className="article-comments">
            {post.comments.length > 0 && <CommentList comments={post.comments} />}

            {user && (
              <div className='new-comment'>
                <strong>Добавить комментарий</strong>
                <Form
                  fields={createCommentFields}
                  submit={createComment}
                  button='ok'
                />
              </div>
            )}

          </section>
        </>
      )}
    </article>
  )
}
