import { Router } from 'express'
import { register, login, autef } from '../controllers/auth.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

//Реєстрація
//http://localhost:3002/api/auth/register
router.post('/register', register)

//Логін
//http://localhost:3002/api/auth/login
router.post('/login', login)

//Авторизація
//http://localhost:3002/api/auth/aut
router.get('/autef', checkAuth, autef)

export default router