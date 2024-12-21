import { useState } from "react";
import { toast } from "react-toastify";

import { PrimaryButton } from "../PrimaryButton";

import "./music.scss";

export const Music = () => {
  const [playlistId, setPlaylistId] = useState("37i9dQZF1DWZoPCylYnvtU");
  const [inputValue, setInputValue] = useState("");

  const handleInput = () => {
    const spotifyUrlPattern = /^(https:\/\/open\.spotify\.com\/embed\/playlist\/|https:\/\/open\.spotify\.com\/playlist\/)([a-zA-Z0-9]+)(\?.*)?$/;
    const plainIdPattern = /^[a-zA-Z0-9]+$/;

    if (spotifyUrlPattern.test(inputValue)) {
      const match = inputValue.match(spotifyUrlPattern);
      if (match) {
        setPlaylistId(match[2]);
      }
    } else if (plainIdPattern.test(inputValue)) {
      setPlaylistId(inputValue);
    } else {
      toast.warn(
        "Por favor, introduce una URL válida de Spotify o un ID de playlist."
      );
    }
  };

  return (
    <div className="container-spotify">
      <div className="container-spotify__title">
        <span>
          <p>
            Añade y escucha <br /> tu playlist favorita
          </p>
        </span>
      </div>

      <div className="container-spotify__content">
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlistId}`}
          id="playlist"
          title="playlist"
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>

      <div className="container-spotify__link">
        <input
          id="linkPlaylist"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Introduce la URL de tu playlist"
        />

        <div className="container-button-add">
          <PrimaryButton
            action={() => handleInput()}
            text="Añadir"
          ></PrimaryButton>
        </div>
      </div>
    </div>
  );
};
