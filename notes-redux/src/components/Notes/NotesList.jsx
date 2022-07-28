import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetNotes } from '../../actions/noteActions'
import NotesItem from './NotesItem'

const NotesList = (props) => {
    const dispatch = useDispatch()

    const notes = useSelector((state) => {
        return state.notes.data
    })
    //console.log('notes', notes)

    useEffect(() => {
        dispatch(startGetNotes())
    }, [dispatch])

    return (
        <div className='notesList'>
            {(notes.length === 0) ? (
                <div>
                    <h3>No notes present</h3>
                    <h4>Add your first note</h4>
                </div>
            ) : (
                <div>
                    <h2 > Listing notes - {notes.length} </h2>

                    <ul>
                        {notes.map((ele) => {
                            return (
                                <li key={ele._id}>
                                    <NotesItem ele={ele} />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default NotesList