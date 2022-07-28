import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const NotesForm = (props) => {
    const { handleFormSubmit, title: noteTitle, body: noteBody } = props

    const [title, setTitle] = useState(noteTitle || '')
    const [body, setBody] = useState(noteBody || '')
    const [reset, setReset] = useState(false)

    const serverError = useSelector((store) => {
        return store.notes.serverErrors
    })
    //console.log(serverError)

    //reset
    useEffect(() => {
        if (reset) {
            setTitle('')
            setBody('')
            setReset(false)
        }
    }, [reset])

    const handleFormReset = () => {
        setReset(true)
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === 'title') {
            setTitle(value)
        } else if (name === 'body') {
            setBody(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title,
            body
        }
        handleFormSubmit(formData, handleFormReset)
    }

    return (
        <div className='notesForm'>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={title}
                    name='title'
                    onChange={handleChange}
                    placeholder='title'
                    className='inputField'
                />
                {serverError.errors && serverError.errors.title && <span>{serverError.errors.title.message}</span>}
                <br />

                <textarea
                    value={body}
                    name='body'
                    onChange={handleChange}
                    placeholder='body'
                    className='inputField'
                /> <br />

                <input type="submit" value='save' />
            </form>
        </div>
    )
}

export default NotesForm