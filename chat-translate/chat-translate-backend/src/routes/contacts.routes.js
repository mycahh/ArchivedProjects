import express from 'express'
import { getContactsById, addContacts } from '../controllers/contacts.js'

const router = express.Router()

router.get('/:id', getContactsById)
router.post('/', addContacts)

export default router