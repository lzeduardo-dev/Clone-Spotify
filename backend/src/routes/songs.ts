import { Router } from 'express'
import { getSongs, getSongById } from '../controllers/songController'

const router = Router()

router.get('/', getSongs)
router.get('/:id', getSongById)

export default router
