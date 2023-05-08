import React from 'react'
import { orderBy } from 'lodash'
import CommentsList from '../common/comments/commentsList'
import AddCommentForm from '../common/comments/addCommentForm'
import { useComments } from '../../hooks/useComments'

const Comments = () => {
    const { createComment, comments, removeComment } = useComments()

    const handleRemoveComment = (id) => {
        removeComment(id)
        // api.comments.remove(id).then((id) => {
        //     setComments(comments.filter((x) => x._id !== id))
        // })
    }
    const handleSubmit = (data) => {
        createComment(data)
        //доп. передаем pageId для того чтобы зафиксировать на какой странице
        //этот коммент должен отображаться
        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]))
        //[...comments, data] - это наши комментарии плюс новые
    }
    const sortedComments = orderBy(comments, ['created_at'], ['desc'])
    return (
        <>
            <div className="card mb-2">
                {' '}
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Comments
