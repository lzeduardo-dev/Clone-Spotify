import { Request, Response, NextFunction } from 'express'
import { Song } from '../models/Song'
import { error } from 'console'


export async function getSongs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const songs = await Song.find(req.query)
    res.status(200).json({ data: songs, message: "ok" });
    if (!songs) throw new Error;
    console.error(error);
    res.status(400).json("Não foi possivel encontrar as Musicas")

    res.json({ data: songs, message: 'ok' })
  } catch (error) {
    next(error)
  }
}


export async function getSongById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const song = await Song.findById(req.params.id).populate('artist', 'name imageUrl bannerUrl')
    if (!song) throw new Error;
    console.error(error);
    res.status(400).json("Não foi possivel encontrar a musica")


    res.json({ data: song, message: 'ok' })
  } catch (error) {
    next(error)
  }
}
