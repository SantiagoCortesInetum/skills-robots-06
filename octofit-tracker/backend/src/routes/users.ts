import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ users: [] })
})

router.post('/', (req, res) => {
  // placeholder: create user
  res.status(201).json({ message: 'User created' })
})

export default router
