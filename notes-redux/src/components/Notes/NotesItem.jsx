import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startDeleteNote } from '../../actions/noteActions'
import EditNote from './EditNote'

const NotesItem = (props) => {
    const { ele } = props
    const [showEdit, setShowEdit] = useState(false)
    const dispatch = useDispatch()

    const handleToggle = () => {
        setShowEdit(!showEdit)
    }

    const handleDelete = (_id) => {
        dispatch(startDeleteNote(_id))
    }


    return (
        <div>
            {(!showEdit) ? (
                <div>
                    <h3>{ele.title}</h3>
                    <h4>{ele.body}</h4>

                    <button onClick={handleToggle}>
                        Edit
                    </button>

                    <button onClick={() => handleDelete(ele._id)} >
                        Delete
                    </button>
                </div>
            ) : (
                <div>
                    <EditNote ele={ele} handleToggle={handleToggle} />

                    <button onClick={handleToggle} >
                        Cancel
                    </button>
                </div>
            )}

            <hr />
        </div>
    )
}

export default NotesItem