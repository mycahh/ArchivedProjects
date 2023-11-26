import express from 'express'
import { getUserByUsername, createUser } from '../controllers/user.js'

const router = express.Router()

router.get('/:username', getUserByUsername)
router.post('/', createUser)


export default router