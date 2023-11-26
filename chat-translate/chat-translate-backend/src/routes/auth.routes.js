import express from 'express'
import { LoginAuthentication, RegisterAuthentication } from '../controllers/auth.js'

const Router = express.Router()

Router.post('/login', LoginAuthentication)
Router.post('/register', RegisterAuthentication)

export default Router