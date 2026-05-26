import { Router } from 'express';
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import { createNoteSchema, getAllNotesSchema, noteIdSchema, updateNoteSchema } from '../validations/notesValidation.js';
import authenticate from '../middleware/authenticate.js';

const notesRouter = Router();

notesRouter.use(authenticate)

notesRouter.get('/',celebrate(getAllNotesSchema), getAllNotes);

notesRouter.get('/:noteId', celebrate(noteIdSchema), getNoteById);

notesRouter.post('/',celebrate(createNoteSchema), createNote);

notesRouter.patch('/:noteId',celebrate(updateNoteSchema), updateNote)

notesRouter.delete('/:noteId',celebrate(noteIdSchema), deleteNote)

export default notesRouter;
