import React from "react";
import { Link } from "react-router-dom";

interface SongItemProps {
  image: string;
  name: string;
  duration: string;
  _id: string;
  index: number;
}

export const SongItem: React.FC<SongItemProps> = ({
  image,
  name,
  duration,
  _id,
  index,
}) => {
  return (
    <Link to={`/song/${_id}`} className="song-item">
      <div className="song-item__number-album">
        <p>{index + 1}</p>
        
        <div className="song-item__album">
          <img
            width={50}
            height={50}
            className="song-item__image"
            src={image}
            alt={`Capa da música ${name}`}
          />
          <p className="song__name">{name}</p>
        </div>
      </div>
      <p>{duration}</p>
    </Link>
  );
};
