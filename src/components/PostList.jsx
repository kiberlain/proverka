import { Link, useNavigate } from 'react-router-dom'
import useStore from 'h/useStore'
import { VscComment, VscEdit, VscTrash } from 'react-icons/vsc'

const PostItem = ({ post }) => {
  const removePost = useStore(({ removePost }) => removePost)
  const navigate = useNavigate()

  return (
    <li className='post-item'>
      <Link
        to={`/blog/post/${post.id}`}
        className='post-link'
        onClick={(e) => {
          if (e.target.localName === 'button' || e.target.localName === 'svg') {
            e.preventDefault()
          }
        }}
      >
        <h5 className='post-title'>
          {post.title}
          {post.commentCount > 0 && (
            <span className='post-comments'>
              <VscComment />
              {post.commentCount}
            </span>
          )}          
        </h5>
      </Link>
      {post.editable && (
        <div className='post-actions'>
          <button
            onClick={() => {
              navigate(`/blog/post/${post.id}?edit=true`)
            }}
            className='button-small info'
          >
            <VscEdit />
          </button>
          <button
            onClick={() => {
              removePost(post.id)
            }}
            className='button-small danger'
          >
            <VscTrash />
          </button>
        </div>
      )}
      <small className="post-info">Автор: {post.author} {new Date(post.created_at).toLocaleString()}</small>
    </li>
  )
}

export const PostList = ({ posts }) => (
  <ol className='post-list'>
    {posts.length > 0 ? (
      posts.map((post) => <PostItem key={post.id} post={post} />)
    ) : (
      <h3>No posts</h3>
    )}
  </ol>
)
