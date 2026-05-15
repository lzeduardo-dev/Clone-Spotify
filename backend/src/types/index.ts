import { Types } from 'mongoose'

export interface IArtist {
  id: Number
  name: string
  image: string
  banner: string
}

export interface ISong {
  name: string
  artist: Types.ObjectId | IArtist
  audio: string
  image: string
  duration: string
  id: number
}

export interface ISongJSON {
  image: string;
  name: string;
  duration: string;
  artist: string; // Aqui é string mesmo!
  audio: string;
  id: number;
}
export interface ApiResponse<T = unknown> {
  data: T
  message: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
