import { Schema, model, Types } from 'mongoose'

interface ILeaderboardEntry {
  user: Types.ObjectId
  score: number
  rank: number
}

interface ILeaderboard {
  period: string
  entries: ILeaderboardEntry[]
}

const entrySchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true }
})

const leaderboardSchema = new Schema<ILeaderboard>({
  period: { type: String, required: true },
  entries: [entrySchema]
})

export default model<ILeaderboard>('Leaderboard', leaderboardSchema)
