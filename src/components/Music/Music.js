import React from "react";
import "./Music.scss";
export default function Music() {
  const addPlaylist = () => {
    let playlist = document.getElementById("playlist");
    let newPlaylist = document.getElementById("linkPlaylist").value;
    let url = `https://open.spotify.com/embed/playlist/${newPlaylist}?utm_source=generator`;
    playlist.setAttribute("src", url);
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
          id="playlist"
          title="playlist"
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZoPCylYnvtU?utm_source=generator"
          className="https://open.spotify.com/playlist/37i9dQZF1DWSpF87bP6JSF"
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        ></iframe>
      </div>
      <div className="container-spotify__link">
        <input
          id="linkPlaylist"
          type="text"
          placeholder="ex: 37i9dQZF1DWSpF87bP6JSF"
        />
        <button className="noSelect" onClick={() => addPlaylist()}>
          <span>Añadir Playlist</span>
        </button>
      </div>
    </div>
  );
}
