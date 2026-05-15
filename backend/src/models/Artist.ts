import { Schema, model, Document } from 'mongoose'

export interface IArtistDoc extends Document {
  id: number;
  image: string
  name: string
  banner: string
}

const ArtistSchema = new Schema<IArtistDoc>(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    banner: { type: String, required: true },
  },
  { timestamps: true }
)


ArtistSchema.index({ name: 'text' })

export const Artist = model<IArtistDoc>('Artist', ArtistSchema)
