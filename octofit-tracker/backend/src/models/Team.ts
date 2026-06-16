import { Schema, model, Types } from 'mongoose'

interface ITeam {
  name: string
  members: Types.ObjectId[]
  createdAt?: Date
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() }
})

export default model<ITeam>('Team', teamSchema)
