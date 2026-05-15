import { Router } from 'express'
import { getArtistById, getArtists, getArtistSongs } from '../controllers/artistController'

const router = Router()

router.get('/', getArtists)
router.get('/:id', getArtistById)
router.get('/:id/songs', getArtistSongs)

export default router
