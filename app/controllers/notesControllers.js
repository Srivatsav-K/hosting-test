const Note = require('../models/noteModel')

const notesControllers = {}

notesControllers.list = (req, res) => {

    Note.find({ user: req.user._id })//.populate('user', ['_id', 'username', 'email'])
        .then((notes) => {
            if (!notes) {
                res.json({ errors: 'Notes not found' })
            } else {
                res.json(notes)
            }
        })
        .catch(err => {
            res.json(err)
        })
}

notesControllers.create = (req, res) => {
    const userId = req.user._id
    const body = req.body
    const note = new Note({ ...body, user: userId })
    note.save()
        .then((note) => {
            res.json(note)
        })
        .catch(err => {
            res.json(err)
        })
}

notesControllers.show = (req, res) => {
    const noteId = req.params.id
    Note.findOne({ _id: noteId, user: req.user._id }).populate('user', '-password')
        .then((note) => {
            if (!note) {
                res.json({ errors: 'Note not found' })
            } else {
                res.json(note)
            }
        })
        .catch(err => {
            res.json(err)
        })
}

notesControllers.update = (req, res) => {
    const noteId = req.params.id
    const body = req.body
    Note.findOneAndUpdate({ _id: noteId, user: req.user._id }, body, { new: true, runValidators: true })
        .then((note) => {
            if (!note) {
                res.json({ errors: 'Notes not found' })
            } else {
                res.json(note)
            }
        })
        .catch(err => {
            res.json(err)
        })
}

notesControllers.delete = (req, res) => {
    const noteId = req.params.id
    Note.findOneAndDelete({ _id: noteId, user: req.user._id })
        .then((note) => {
            if (!note) {
                res.json({ errors: 'Notes not found' })
            } else {
                res.json(note)
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports = notesControllers