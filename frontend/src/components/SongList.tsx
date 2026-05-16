import React, { useState } from "react";
import { SongItem } from "./SongItem";
import { SongResponse } from "../api/songs";

interface SongListProps {
  songsArray: SongResponse[];
}

export const SongList: React.FC<SongListProps> = ({ songsArray }) => {
  const [items, setItems] = useState(5);

  return (
    <div className="song-list">
      {songsArray
        .filter((_, index) => index < items)
        .map((currentSongObj, index) => (
          <SongItem 
            {...currentSongObj} 
            index={index} 
            key={currentSongObj._id} // ID vindo do backend
          />
        ))}
        
      <p
        className="song-list__see-more"
        onClick={() => {
          setItems(items + 5);
        }}
      >
        Ver mais
      </p>
    </div>
  );
};