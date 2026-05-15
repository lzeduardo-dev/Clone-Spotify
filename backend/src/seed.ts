import mongoose from 'mongoose';
import { env } from './config/env';
import { Artist } from './models/Artist';
import { Song } from './models/Song';
import { artistArray } from './database/artists';
import { songsArray } from './database/songsArray';

async function seed() {
  try {
    
    await mongoose.connect(env.mongodbUri);
    console.log("✅ Conectado ao banco de dados!");


    console.log("🏗️ Garantindo a criação das coleções...");
    await Artist.createCollection();
    await Song.createCollection();

   
    console.log("Limpando dados antigos...");
    await Artist.deleteMany({});
    await Song.deleteMany({});

  
    console.log("🌱 Inserindo artistas no banco de dados...");
    const newArtistArray = artistArray.map(({ id, ...rest }) => rest);
    const createdArtists = await Artist.insertMany(newArtistArray);
    console.log(`✔️ ${createdArtists.length} artistas inseridos!`);

    // acc vira um dicionario com a chave sendo o nome do artista e o ObjectId gerado pelo mongo como valor
    const artistsMap = createdArtists.reduce((acc, artist) => {
      acc[artist.name] = artist._id;
      return acc;
    }, {} as Record<string, mongoose.Types.ObjectId>);

    // cria um novo array de songs com a chave artist sendo vinculada ao ObjectId que está associado ao nome do artista
    const newSongsArray = songsArray.map(({ id, ...rest }) => {
      return { ...rest, artist: artistsMap[rest.artist]};
    });


    console.log("🎵 Adicionando Músicas...");
    const createdSongs = await Song.insertMany(newSongsArray);
    console.log(`✔️ ${createdSongs.length} músicas inseridas com sucesso!`);

  } catch (error) {
    console.error("❌ Erro ao popular o banco:", error);
  } finally {

    await mongoose.disconnect();
    console.log("🔌 Conexão encerrada.");
  }
}

seed();