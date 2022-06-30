import { useState } from 'react'
import useStore from 'h/useStore'
import commentApi from 'a/comment'
import { Form, Protected } from 'c'
import { VscEdit, VscTrash } from 'react-icons/vsc'

export const CommentList = ({ comments }) => {
  const { user, setLoading, setError } = useStore(
    ({ user, setLoading, setError }) => ({ user, setLoading, setError })
  )
  const [editComment, setEditComment] = useState(null)

  const remove = (id) => {
    setLoading(true)
    commentApi.remove(id).catch(setError)
  }

  const update = (data) => {
    setLoading(true)
    data.id = editComment.id
    commentApi.update(data).catch(setError)
  }

  if (editComment) {
    const fields = [
      {
        tag: 'textarea',
        id: 'content',
        label: 'Комментарий',
        type: 'text',
        value: editComment.content
      }
    ]

    return (
      <Protected>
        <h3>Обновить комментарий</h3>
        <Form fields={fields} submit={update} button='Update' />
      </Protected>
    )
  }

  return (
    <section className='comments'>
      <h4 className='comments-title'>Обсуждение</h4>

      <ul className="comments-list">
        {comments.map((comment) => (
          <li className='comments-item comment' key={comment.id}>
            <p className='comment-text'>{comment.content}</p>
            {comment.user_id === user?.id ? (
              <div className='comment-actions'>
                <button onClick={() => setEditComment(comment)} className='info'>
                  <VscEdit />
                </button>
                <button onClick={() => remove(comment.id)} className='danger'>
                  <VscTrash />
                </button>
              </div>
            ) : (
              <p className='comment-author'>Автор: {comment.author}</p>
            )}
            <small className='comment-date'>
              {new Date(comment.created_at).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </section>
  )
}
