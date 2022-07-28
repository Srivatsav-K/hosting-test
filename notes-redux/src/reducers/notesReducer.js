import { DELETE_NOTE, EDIT_NOTE, GET_NOTES, NOTES_ERRORS, POST_NOTE } from "../actions/noteActions"

const notesInitialValue = {
    data: [],
    serverErrors: {},
    loading: false
}

const notesReducer = (state = notesInitialValue, action) => {
    switch (action.type) {
        case (GET_NOTES): {
            return { ...state, data: [...action.payload].reverse() }
        }
        case (POST_NOTE): {
            return { ...state, data: [{ ...action.payload }, ...state.data] }
        }
        case (DELETE_NOTE): {
            return { ...state, data: state.data.filter(ele => ele._id !== action.payload) }
        }
        case (EDIT_NOTE): {
            return (
                {
                    ...state,
                    data: state.data.map(ele => {
                        if (ele._id === action.payload._id) {
                            return { ...ele, ...action.payload }
                        } else {
                            return { ...ele }
                        }
                    })
                }
            )
        }
        case (NOTES_ERRORS): {
            return { ...state, serverErrors: { ...action.payload } }
        }
        default: {
            return { ...state }
        }
    }
}

export default notesReducer