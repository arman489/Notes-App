import express from 'express'
import { PostNotes,getNotes,getDelete,UpdateData,getSingle,searchNotes } from '../controller/NotesControll.js'
import userAuth from '../middleware/userAuth.js'

const Notes = express.Router()

Notes.post('/create',userAuth,PostNotes)
Notes.get('/getNotes',userAuth,getNotes)
Notes.delete('/deleteNotes/:id',userAuth,getDelete)
Notes.put('/updateNotes/:id',userAuth,UpdateData)
Notes.get('/single/:id',userAuth,getSingle)
Notes.get('/search',userAuth,searchNotes)

export default Notes

