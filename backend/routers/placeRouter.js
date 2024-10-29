import { Router } from 'express'
import { getAllPlaces, createPlace, getPlace, updatePlace, deletePlace, showStats } from '../controllers/placeController.js'
import { validatePlaceInput } from '../middleware/validationMiddleware.js'

const router = Router()

router.route('/').get(getAllPlaces).post(validatePlaceInput, createPlace)
router.route('/stats').get(showStats)
router.route('/:id').get(getPlace).patch(validatePlaceInput, updatePlace).delete(deletePlace)

export default router
