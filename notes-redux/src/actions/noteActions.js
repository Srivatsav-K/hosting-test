import axios from "axios"

export const NOTES_ERRORS = 'NOTES_ERRORS'
export const GET_NOTES = 'GET_NOTES'
export const POST_NOTE = 'POST_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'
export const EDIT_NOTE = 'EDIT_NOTE'

const notesServerErrors = (errors) => {
    return { type: NOTES_ERRORS, payload: errors }
}

// get notes
const getNotes = (notes) => {
    return { type: GET_NOTES, payload: notes }
}

export const startGetNotes = () => {
    return (
        (dispatch, getState) => {
            axios.get('http://localhost:3050/user/notes', {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        dispatch(notesServerErrors(result))
                    } else {
                        dispatch(getNotes(result))
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    )
}

//post note
const postNote = (note) => {
    return { type: POST_NOTE, payload: note }
}

export const startPostNote = (formData, handleFormReset) => {
    return (
        (dispatch, getState) => {
            axios.post('http://localhost:3050/user/notes', formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        dispatch(notesServerErrors(result))
                    } else {
                        dispatch(postNote(result))
                        handleFormReset()
                    }
                })
        }
    )
}

//delete 
const deleteNote = (_id) => {
    return { type: DELETE_NOTE, payload: _id }
}

export const startDeleteNote = (_id) => {
    return (
        (dispatch, getState) => {
            axios.delete(`http://localhost:3050/user/notes/${_id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        alert(result.errors)
                    } else {
                        dispatch(deleteNote(result._id))
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    )
}

//edit note
const editNote = (editedNote) => {
    return { type: EDIT_NOTE, payload: editedNote }
}

export const startEditNote = (formData, _id, handleToggle) => {
    return (
        (dispatch, getState) => {
            axios.put(`http://localhost:3050/user/notes/${_id}`, formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        alert(result.errors)
                    } else {
                        dispatch(editNote(result))
                        handleToggle()
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    )
}
