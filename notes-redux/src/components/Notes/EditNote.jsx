import { useDispatch } from 'react-redux'
import { startEditNote } from '../../actions/noteActions'
import NotesForm from './NotesForm'

const EditNote = (props) => {
    const { ele, handleToggle } = props

    const dispatch = useDispatch()

    const handleFormSubmit = (formData) => {
        dispatch(startEditNote(formData, ele._id, handleToggle))
    }

    return (
        <div>
            <NotesForm {...ele} handleFormSubmit={handleFormSubmit} />
        </div>
    )
}

export default EditNote