import { useState } from "react";
import { toast } from "react-toastify";

import { PrimaryButton } from "../PrimaryButton";

import useSound from "../../hooks/useSound";

import "./music.scss";
import { Icon } from "semantic-ui-react";

export const Music = () => {
  const { addSound } = useSound();

  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);

  const handleInput = () => {
    const fileInput = document.getElementById("soundFile");
    setFile(fileInput.files[0]);
    fileInput.value = "";
  };

  return (
    <div className="container-spotify">
      <div className="container-spotify__title">
        <span>
          <p>
            Añade y escucha <br /> sonidos relajantes
          </p>
        </span>
      </div>

      <div className="container-spotify__content">
        <div id="FileUpload" className="container-upload">
          <input
            id="soundFile"
            type="file"
            accept="audio/mp3"
            onChange={handleInput}
          />
          <div className="container-upload__content">
            <span>
              {file === null ? (
                <Icon name="cloud upload" />
              ) : (
                <Icon name="file audio" />
              )}
            </span>
            {file === null ? (
              <p className="paragraph-def">
                Has click para seleccionar un archivo
              </p>
            ) : (
              <p className="paragraph-def">
                Archivo seleccionado: <b>{file.name}</b>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container-spotify__link">
        <input
          id="soundTitle"
          type="text"
          placeholder="Título del sonido"
          value={inputValue}
          className="paragraph-def"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="container-button-add">
          <PrimaryButton
            action={() => {
              if (!file) {
                toast.warn("Selecciona un archivo de sonido.");
                return;
              }

              if (!inputValue.trim()) {
                toast.warn("Introduce un título para el sonido.");
                return;
              }

              addSound(file, inputValue);
              setInputValue("");
              setFile(null);
            }}
            text="Añadir"
          />
        </div>
      </div>
    </div>
  );
};
