import React, { useRef, useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";

import useSound from "../../hooks/useSound";

import "./controls.scss";

export const Controls = () => {
  const { sounds, deleteSound } = useSound();

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

  const AudioPlayer = ({ url, text, onDelete }) => {
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
            {playing ? <Icon name="pause" /> : <Icon name="play" />}
          </button>
          <p>{text}</p>
        </div>
        <div className="container-controls__content__audio">
          <input
            type="range"
            min={0}
            className="range"
            max={100}
            value={volume}
            onChange={handleVolumeChange}
          />
          <button onClick={onDelete} className="delete-button">
            <Icon name="trash" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container-controls">
      {sounds.map((sound) => (
        <div key={sound.id}>
          <AudioPlayer
            url={sound.sound}
            text={sound.title}
            onDelete={() => deleteSound(sound.id)}
          />
          <br />
        </div>
      ))}
    </div>
  );
};
