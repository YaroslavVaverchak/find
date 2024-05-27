import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { createFinds, getAll, getById, getMyFinds, removeFinds, updateFinds} from '../controllers/finds.js'

const router = new Router()

//Створити оголошення
//http://localhost:3002/api/finds
router.post('/', checkAuth, createFinds)

//Усі оголошення
//http://localhost:3002/api/finds
router.get('/', getAll)

//Усі оголошення по іd
//http://localhost:3002/api/finds/:id
router.get('/:id', getById)

//Усі оголошення користувача
//http://localhost:3002/api/finds/user/me
router.get('/user/me', checkAuth, getMyFinds) 

//Видалення оголошення 
//http://localhost:3002/api/finds/:id
router.delete('/:id', checkAuth, removeFinds) 

//Редагування оголошення
//http://localhost:3002/api/finds/:id
router.put('/:id',checkAuth, updateFinds)

export default router