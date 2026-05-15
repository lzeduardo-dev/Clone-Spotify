import React, { useEffect, useState } from "react";
import { ItemList } from "./ItemList";
import { getArtists, ArtistResponse } from "../api/artists";
import { getSongs, SongResponse } from "../api/songs"; // Lembre-se de checar se nomeou como SongResponse ou SongsResponse

interface MainProps {
  type?: "artists" | "songs";
}

export const Main: React.FC<MainProps> = ({ type }) => {

  const [artists, setArtists] = useState<ArtistResponse[]>([]);
  const [songs, setSongs] = useState<SongResponse[]>([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Dispara ambas as requisições ao mesmo tempo
        const [artistsData, songsData] = await Promise.all([
          getArtists(),
          getSongs(),
        ]);

        setArtists(artistsData);
        setSongs(songsData);
      } catch (error) {
        console.error("Falha ao carregar dados da API:", error);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="main">
      {/* ItemList de Musicas */}
      {type === "songs" || type === undefined ? (
        <ItemList
          title="Musicas"
          items={7}
          itemsArray={songs} // Agora repassando o estado com dados do backend
          path="/songs"
          idPath="/song"
        />
      ) : null}

      {/* Itemlist de artistas */}
      {type === "artists" || type === undefined ? (
        <ItemList
          title="Artistas"
          items={14}
          itemsArray={artists} // Agora repassando o estado com dados do backend
          path="/artists"
          idPath="/artist"
        />
      ) : null}
    </div>
  );
};
