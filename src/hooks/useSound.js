import { useContext } from "react";
import SoundContext from "../context/SoundProvider";

const useSound = () => {
  return useContext(SoundContext);
};

export default useSound;
