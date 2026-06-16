/**
 * Seed the octofit_db database with test data
 *
 * Usage: `ts-node src/scripts/seed.ts` or `npm run seed`
 */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User'
import Team from '../models/Team'
import Activity from '../models/Activity'
import Workout from '../models/Workout'
import Leaderboard from '../models/Leaderboard'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db'

async function seed() {
  console.log('Seed the octofit_db database with test data')
  await mongoose.connect(MONGO_URI)

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ])

  // Create users
  const users = await User.create([
    { name: 'Alice Rivera', email: 'alice@example.com' },
    { name: 'Bruno Silva', email: 'bruno@example.com' },
    { name: 'Chen Li', email: 'chen@example.com' }
  ])

  // Create teams
  const team = await Team.create({ name: 'Morning Runners', members: [users[0]._id, users[1]._id] })
  await User.updateOne({ _id: users[0]._id }, { team: team._id })
  await User.updateOne({ _id: users[1]._id }, { team: team._id })

  // Create workouts
  const workouts = await Workout.create([
    {
      title: 'Full Body HIIT',
      description: 'A fast-paced high-intensity interval training',
      exercises: [
        { name: 'Burpees', reps: 15 },
        { name: 'Jumping Jacks', durationMinutes: 2 }
      ],
      createdBy: users[0]._id
    },
    {
      title: 'Easy Recovery',
      description: 'Light stretching and mobility',
      exercises: [{ name: 'Stretching', durationMinutes: 15 }],
      createdBy: users[1]._id
    }
  ])

  // Create activities
  await Activity.create([
    { user: users[0]._id, type: 'run', durationMinutes: 30, calories: 300, date: new Date() },
    { user: users[1]._id, type: 'bike', durationMinutes: 45, calories: 500, date: new Date() },
    { user: users[2]._id, type: 'yoga', durationMinutes: 60, calories: 200, date: new Date() }
  ])

  // Leaderboard
  await Leaderboard.create({ period: 'weekly', entries: [
    { user: users[1]._id, score: 950, rank: 1 },
    { user: users[0]._id, score: 880, rank: 2 }
  ]})

  console.log('Seeding complete')
  await mongoose.disconnect()
}

seed().catch(err => {
  console.error('Seeding error:', err)
  process.exit(1)
})
