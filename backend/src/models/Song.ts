import { Schema, model, Document, Types } from 'mongoose'


export interface ISongDoc extends Document {
  image: string
  name: string
  duration: string
  artist: Types.ObjectId
  audio: string
  id: number
}

const SongSchema = new Schema<ISongDoc>(
  {
    image: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    duration: { type: String, required: true },
    artist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
    audio: { type: String, required: true },
    id: { type: Number, default: 0 },
  },
  { timestamps: true }
)

// Índice para busca por título
SongSchema.index({ title: 'text' })

export const Song = model<ISongDoc>('Song', SongSchema)
