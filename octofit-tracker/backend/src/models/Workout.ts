import { Schema, model, Types } from 'mongoose'

interface IWorkout {
  title: string
  description?: string
  exercises: { name: string; reps?: number; durationMinutes?: number }[]
  createdBy?: Types.ObjectId
  date?: Date
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: String,
  exercises: [{ name: String, reps: Number, durationMinutes: Number }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: () => new Date() }
})

export default model<IWorkout>('Workout', workoutSchema)
