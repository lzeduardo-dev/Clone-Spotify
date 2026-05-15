import { Request, Response, NextFunction } from "express";
import { Artist } from "../models/Artist";
import { Song } from "../models/Song";
import { Types } from "mongoose";

export async function getArtists(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Buscamos os documentos. O Mongoose retorna um array vazio [] se não achar nada (não null).
    const artists = await Artist.find(req.query);
    
    res.status(200).json({ data: artists, message: "ok" });
  } catch (error) {
    next(error);
  }
}

export async function getArtistById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(String(id))) {
      res.status(400).json({ message: "ID inválido" });
      return; 
    }

    const artist = await Artist.findById(id);

    if (!artist) {
      res.status(404).json({ message: "Artista não encontrado" });
      return;
    }

    res.status(200).json({ data: artist, message: "ok" });
  } catch (error) {
    next(error);
  }
}

export async function getArtistSongs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    // Primeiro verificamos se o artista existe
    const artistExists = await Artist.exists({ _id: id });
    
    if (!artistExists) {
      res.status(404).json({ message: "Artista não encontrado" });
      return;
    }

    // Buscamos as músicas que possuem o ID do artista no campo 'artist'
    const songs = await Song.find({ artist: id }).sort({ name: 1 });

    res.status(200).json({ data: songs, message: "ok" });
  } catch (error) {
    next(error);
  }
}