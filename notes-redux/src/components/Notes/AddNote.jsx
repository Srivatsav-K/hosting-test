import { useDispatch } from 'react-redux'
import { startPostNote } from '../../actions/noteActions'
import NotesForm from './NotesForm'

const AddNote = () => {
    const dispatch = useDispatch()

    const handleFormSubmit = (formData, handleFormReset) => {
        dispatch(startPostNote(formData, handleFormReset))
    }

    return (
        <div className='addNote'>
            <h2>Add note</h2>
            <NotesForm handleFormSubmit={handleFormSubmit} />
        </div>
    )
}

export default AddNote