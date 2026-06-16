import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ teams: [] })
})

router.post('/', (req, res) => {
  // placeholder: create team
  res.status(201).json({ message: 'Team created' })
})

export default router
