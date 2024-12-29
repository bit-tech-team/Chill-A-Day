import React, { createContext, useState, useEffect } from "react";

import rainSound from "../assets/sounds/rain.mp3";
import ambianceSounda from "../assets/sounds/night.mp3";
import streetSound from "../assets/sounds/street.mp3";
import fireplace from "../assets/sounds/fireplace.mp3";
import cricket from "../assets/sounds/cricket.mp3";

const SoundContext = createContext();

const SoundProvider = ({ children }) => {
  const defaultSounds = [
    { id: "1", sound: streetSound, title: "Street ambiance" },
    { id: "2", sound: ambianceSounda, title: "Night ambiance" },
    { id: "3", sound: rainSound, title: "Rain" },
    { id: "4", sound: fireplace, title: "Fireplace" },
    { id: "5", sound: cricket, title: "Crickets" },
  ];

  const loadSounds = () => {
    const savedSounds = localStorage.getItem("sounds");
    return savedSounds ? JSON.parse(savedSounds) : defaultSounds;
  };

  const [sounds, setSounds] = useState(loadSounds);

  const addSound = (file, title) => {
    const validTypes = ["audio/mpeg"];

    if (!validTypes.includes(file.type)) {
      return alert("Seleccione un archivo válido de MP3.");
    }

    const newSound = {
      id: Date.now().toString(),
      sound: URL.createObjectURL(file),
      title,
    };

    const updatedSounds = [...sounds, newSound];
    setSounds(updatedSounds);
    localStorage.setItem("sounds", JSON.stringify(updatedSounds));
  };

  const deleteSound = (id) => {
    const updatedSounds = sounds.filter((sound) => sound.id !== id);
    setSounds(updatedSounds);
    localStorage.setItem("sounds", JSON.stringify(updatedSounds));
  };

  useEffect(() => {
    return () => {
      sounds.forEach((sound) => URL.revokeObjectURL(sound.sound));
    };
  }, [sounds]);

  return (
    <SoundContext.Provider value={{ sounds, addSound, deleteSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export { SoundProvider };

export default SoundContext;
