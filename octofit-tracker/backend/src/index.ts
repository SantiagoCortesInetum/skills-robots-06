import express from 'express'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit'

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API running' })
})

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(Number(PORT), () => {
      console.log(`Server listening on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error('MongoDB connection error:', err)
  })

export default app
