import React, { useEffect, useState } from "react";
import "./Controls.scss";
import rainSound from "../../assets/sounds/RAIN_ON_WINDOW.500dc4a4.mp3";
import ambianceSounda from "../../assets/sounds/NIGHT_AMBIENCE.9ed79ed0.mp3";

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

  const ButtonPlayer = ({ url, audTargetId }) => {
    const [playing, toggle] = useAudio(url, audTargetId);
    console.log(audTargetId, url);
    return (
      <>
        <button onClick={toggle}>
          {playing ? (
            <i className="fas fa-pause" />
          ) : (
            <i className="fas fa-play" />
          )}
        </button>
      </>
    );
  };

  const InputVolume = () => {
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);
    const finalVolume = muted ? 0 : volume ** 2;
    {
      /* <p>final volume: {finalVolume.toFixed(3)}</p> */
    }
    return (
      <input
        type="range"
        min={0}
        max={1}
        step={0.02}
        value={volume}
        onChange={(event) => {
          setVolume(event.target.valueAsNumber);
        }}
      />
    );
  };
  return (
    <div className="container-controls">
      <div className="container-controls__content">
        <div className="container-controls__content__title">
          <ButtonPlayer url={rainSound} audTargetId={"audio-0"} />
          <p>Rain sound</p>
        </div>
        <div className="container-controls__content__audio">
          <i className="fas fa-volume-up"></i>
          <InputVolume />
          <audio id="audio-0">
            <source type="audio/mpeg" src={rainSound} />
            <p>Your browser doesn't support HTML 5 sounds.</p>
          </audio>
        </div>
        <br />
        <div className="container-controls__content__title">
          <ButtonPlayer url={ambianceSounda} />
          <p>Nigth ambiance</p>
        </div>
        <div className="container-controls__content__audio">
          <i className="fas fa-volume-up"></i>
          <InputVolume />
        </div>
      </div>
    </div>
  );
}
