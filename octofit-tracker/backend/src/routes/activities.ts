import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ activities: [] })
})

router.post('/', (req, res) => {
  // placeholder: log activity
  res.status(201).json({ message: 'Activity logged' })
})

export default router
