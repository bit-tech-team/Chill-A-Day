import React, { useEffect, useRef, useState } from "react";
import "./Controls.scss";
import rainSound from "../../assets/sounds/RAIN_ON_WINDOW.500dc4a4.mp3";
import ambianceSounda from "../../assets/sounds/NIGHT_AMBIENCE.9ed79ed0.mp3";
import streetSound from "../../assets/sounds/STREET_AMBIENCE.7cf1da37.mp3";
import fireplace from "../../assets/sounds/fireplace.mp3";

export default function Controls() {
  const useAudio = (url, audTargetId) => {
    const [audio = document.getElementById(audTargetId)] = useState(
      new Audio(url)
    );
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
      playing ? audio.play() : audio.pause();
    }, [audio, playing]);

    useEffect(() => {
      audio.addEventListener("ended", () => setPlaying(false));
      return () => {
        audio.removeEventListener("ended", () => setPlaying(false));
      };
    });
    return [playing, toggle];
  };

  const AudioPlayer = ({ url, audTargetId, text, sliderId }) => {
    const [playing, toggle] = useAudio(url, audTargetId);
    const [volumen, setVolumen] = useState(1);
    const [muted, setMuted] = useState(false);
    const finalVolume = muted ? 0 : volumen ** 2;
    const audioPlayer = useRef()    

    return (
      <div>
        <div className="container-controls__content__title">
          <button onClick={toggle}>
            {playing ? (
              <i className="fas fa-pause" />
            ) : (
              <i className="fas fa-play" />
            )}
          </button>
          <p>{text}</p>
        </div>
        <div className="container-controls__content__audio">
          {/* <i className="fas fa-volume-up"></i>
          <input
            type="range"
            min={1}
            max={100}
            id={sliderId}
            defaultValue="50"
            onChange={(e) => {
              audioPlayer.current.volume = e.target.value / 100
              
            }}
          /> */}
          <audio ref={audioPlayer} id={audTargetId} loop>
            <source type="audio/mpeg" src={url} />
            <p>Your browser doesn't support HTML 5 sounds.</p>
          </audio>
        </div>
      </div>
    );
  };

  return (
    <div className="container-controls">
      <AudioPlayer
        url={rainSound}
        audTargetId={"audio-0"}
        text={"Rain sound"}
        sliderId={"slider-aud-0"}
      />
      <br />
      <AudioPlayer
        url={ambianceSounda}
        audTargetId={"audio-1"}
        text={"Nigth ambiance"}
        sliderId={"slider-aud-1"}
      />
      <br />
      <AudioPlayer
        url={streetSound}
        audTargetId={"audio-2"}
        text={"Street sound"}
        sliderId={"slider-aud-2"}
      />
      <br />
      <AudioPlayer
        url={fireplace}
        audTargetId={"audio-3"}
        text={"Fireplace"}
        sliderId={"slider-aud-3"}
      />
    </div>
  );
}
