import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'
import { getCurrentUserId } from './users'
import { nanoid } from 'nanoid'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload)
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            )
        }
    }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFailed,
    commentCreated,
    commentRemoved
} = actions

const addCommentRequested = createAction('comments/addCommentRequested')
const removeCommentRequested = createAction('comments/removeCommentRequested')

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.getComments(userId)
        dispatch(commentsReceved(content))
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}
export const createComment = (payload) => async (dispatch, getState) => {
    dispatch(addCommentRequested(payload))
    const comment = {
        ...payload,
        _id: nanoid(),
        created_at: Date.now(),
        userId: getCurrentUserId()(getState())
    }
    try {
        const { content } = await commentService.createComment(comment)
        dispatch(commentCreated(content))
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}
export const removeComment = (commentId) => async (dispatch) => {
    dispatch(removeCommentRequested())
    try {
        const { content } = await commentService.removeComment(commentId)
        if (content === null) {
            dispatch(commentRemoved(commentId))
        }
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading

export default commentsReducer
