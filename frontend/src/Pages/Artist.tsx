import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { SongList } from "../components/SongList";
import { getArtists, ArtistResponse } from "../api/artists";
import { getSongs, SongResponse } from "../api/songs";

export const Artist: React.FC = () => {
  const { id } = useParams();

  // Estados para armazenar as respostas da API
  const [artistObj, setArtistObj] = useState<ArtistResponse | null>(null);
  const [songsArrayFromArtist, setSongsArrayFromArtist] = useState<SongResponse[]>([]);
  const [randomIdFromArtist, setRandomIdFromArtist] = useState<string>("");

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const [artistsData, songsData] = await Promise.all([
          getArtists(),
          getSongs()
        ]);
        // Filtra o artista atual
        const currentArtist = artistsData.find((artist) => artist._id === id);
        
        if (currentArtist) {
          setArtistObj(currentArtist);

          // Filtra as músicas pertencentes a esse artista
          const artistSongs = songsData.filter(
            (song) => song.artist === currentArtist._id
          );
          setSongsArrayFromArtist(artistSongs);

          // Lógica segura para o index aleatório (previne erros se não houver músicas)
          if (artistSongs.length > 0) {
            const randomIndex = Math.floor(Math.random() * artistSongs.length);
            setRandomIdFromArtist(artistSongs[randomIndex]._id);
          }
        }
      } catch (error) {
        console.error("Falha ao carregar a página do artista:", error);
      }
    };

    fetchArtistData();
  }, [id]); // O useEffect roda novamente se o ID na URL mudar

  if (!artistObj) {
    return <div className="text-white p-10 font-bold text-xl">Carregando artista...</div>;
  }

  return (
    <div className="artist">
      <div
        className="artist__header"
        style={{
          backgroundImage: `linear-gradient(to bottom, var(--_shade), var(--_shade)), url(${artistObj.banner})`,
        }}
      >
        <h2 className="artist__title">{artistObj.name}</h2>
      </div>

      <div className="artist__body">
        <h2>Populares</h2>
        <SongList songsArray={songsArrayFromArtist} />
      </div>

      {/* O botão play só será um link válido se houver um ID aleatório gerado */}
      {randomIdFromArtist ? (
        <Link to={`/song/${randomIdFromArtist}`}>
          <FontAwesomeIcon
            className="single-item__icon single-item__icon--artist"
            icon={faCirclePlay}
          />
        </Link>
      ) : null}
    </div>
  );
};