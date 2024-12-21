import React, { useEffect, useRef, useState } from "react";

import rainSound from "../../assets/sounds/RAIN_ON_WINDOW.500dc4a4.mp3";
import ambianceSounda from "../../assets/sounds/NIGHT_AMBIENCE.9ed79ed0.mp3";
import streetSound from "../../assets/sounds/STREET_AMBIENCE.7cf1da37.mp3";
import fireplace from "../../assets/sounds/fireplace.mp3";

import "./controls.scss";

export const Controls = () => {
  const useAudio = (url) => {
    const audio = useRef(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
      playing ? audio.current.play() : audio.current.pause();
    }, [playing]);

    useEffect(() => {
      const onEnded = () => setPlaying(false);
      const currentAudio = audio.current;
      currentAudio.addEventListener("ended", onEnded);
      return () => {
        currentAudio.removeEventListener("ended", onEnded);
      };
    }, []);

    return [audio, playing, toggle];
  };

  const AudioPlayer = ({ url, text }) => {
    const [audio, playing, toggle] = useAudio(url);
    const [volume, setVolume] = useState(50);

    const handleVolumeChange = (e) => {
      const newVolume = e.target.value;
      setVolume(newVolume);
      audio.current.volume = newVolume / 100;
    };

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
          <i className="fas fa-volume-up"></i>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="container-controls">
      <AudioPlayer url={rainSound} text={"Rain sound"} />
      <br />
      <AudioPlayer url={ambianceSounda} text={"Night ambiance"} />
      <br />
      <AudioPlayer url={streetSound} text={"Street sound"} />
      <br />
      <AudioPlayer url={fireplace} text={"Fireplace"} />
    </div>
  );
};
