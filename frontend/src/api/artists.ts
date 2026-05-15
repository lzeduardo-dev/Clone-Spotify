// src/api/artists.ts
import { apiClient } from './client';


export interface ArtistResponse {
  _id: string;
  name: string;
  image: string;
  banner: string;
}

export const getArtists = async (): Promise<ArtistResponse[]> => {
  const response = await apiClient.get('/artists')
  return response.data.data;
}

export const getArtistById = async (id: string): Promise<ArtistResponse> => {
  const response = await apiClient.get(`/artists/${id}`);
  return response.data.data;
};