import { Router } from 'express'
import Leaderboard from '../models/Leaderboard'

const router = Router()

router.get('/', async (req, res) => {
  const boards = await Leaderboard.find().populate('entries.user').lean()
  res.json({ leaderboard: boards })
})

export default router
