import { Router } from 'express'
import User from '../models/User'

const router = Router()

router.get('/', async (req, res) => {
  const users = await User.find().lean()
  res.json({ users })
})

router.post('/', async (req, res) => {
  const data = req.body
  const created = await User.create(data)
  res.status(201).json(created)
})

export default router
