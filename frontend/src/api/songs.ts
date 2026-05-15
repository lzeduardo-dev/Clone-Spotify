import { apiClient } from "./client";

export interface SongResponse {
  _id: string;
  name: string;
  image: string;
  banner: string;
};

export const getSongs = async (): Promise<SongResponse[]> => {
  const response = await apiClient.get("/songs");

  return response.data.data;
};

export const getArtistById = async (id: string): Promise<SongResponse> => {
  const response = await apiClient.get(`/songs/${id}`);
  return response.data.data;
};
