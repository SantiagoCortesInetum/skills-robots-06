import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import workoutsRouter from './routes/workouts'
import leaderboardRouter from './routes/leaderboard'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit'
const CODESPACE = process.env.CODESPACE_NAME

app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API running' })
})

// Mount API routes
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/workouts', workoutsRouter)
app.use('/api/leaderboard', leaderboardRouter)

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')

    const host = '0.0.0.0'
    const apiUrl = CODESPACE
      ? `https://${CODESPACE}-8000.githubpreview.dev`
      : `http://localhost:${PORT}`

    app.listen(Number(PORT), host, () => {
      console.log(`Server listening on ${host}:${PORT}`)
      console.log(`API base URL: ${apiUrl}`)
    })
  })
  .catch(err => {
    console.error('MongoDB connection error:', err)
  })

export default app
