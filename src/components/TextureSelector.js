import { useEffect } from "react";

import { useKeyboard } from "../hooks/useKeyboard";
import { useStore } from "../hooks/useStore";
import { dirtImg, grassImg, glassImg, woodImg, logImg } from "../images/images";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

export const TextureSelector = () => {
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);

  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    if (dirt) {
      setTexture("dirt");
    } else if (grass) {
      setTexture("grass");
    } else if (glass) {
      setTexture("glass");
    } else if (wood) {
      setTexture("wood");
    } else if (log) {
      setTexture("log");
    }
  });

  return (
    <div className="absolute texture-selector">
      {Object.keys(images).map((key, i) => (
        <div
          key={key}
          className={`relative texture ${
            key === activeTexture ? "active" : ""
          }`}
        >
          <img src={images[key]} alt={key} />
          <div className="absolute">{i + 1}</div>
        </div>
      ))}
    </div>
  );
};
