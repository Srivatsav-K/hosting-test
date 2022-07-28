import React from 'react'

import AddNote from './AddNote'
import NotesList from './NotesList'

const NotesContainer = () => {
    return (
        <div>
            <h1>My notes</h1>
            <div className='notesContainer'>
                <NotesList />
                <AddNote />
            </div>
        </div>
    )
}

export default NotesContainer