import { useBox } from "@react-three/cannon";
import { useState } from "react";

import { useStore } from "../hooks/useStore";
import * as textures from "../images/textures";

export const Cube = ({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);

  const activeTexture = textures[texture + "Texture"];

  const handleClick = (e) => {
    e.stopPropagation();
    const clickedFace = Math.floor(e.faceIndex / 2);
    const { x, y, z } = ref.current.position;
    if (e.altKey) {
      removeCube(x, y, z);
    } else if (clickedFace === 0) {
      addCube(x + 1, y, z);
    } else if (clickedFace === 1) {
      addCube(x - 1, y, z);
    } else if (clickedFace === 2) {
      addCube(x, y + 1, z);
    } else if (clickedFace === 3) {
      addCube(x, y - 1, z);
    } else if (clickedFace === 4) {
      addCube(x, y, z + 1);
    } else if (clickedFace === 5) {
      addCube(x, y, z - 1);
    }
  };

  const onHover = (e) => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const onUnhover = (e) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  return (
    <mesh
      ref={ref}
      onClick={handleClick}
      onPointerMove={onHover}
      onPointerOut={onUnhover}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        map={activeTexture}
        attach="material"
        color={isHovered ? "grey" : "white"}
        transparent
        opacity={texture === "glass" ? 0.75 : 1}
      />
    </mesh>
  );
};
