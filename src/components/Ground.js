import { usePlane } from "@react-three/cannon";

import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";

const roundCoordinate = (val) => {
  if (val > 0) {
    return Math.abs(val % 1) > 0.5 ? Math.ceil(val) : Math.floor(val);
  } else {
    return Math.abs(val % 1) > 0.5 ? Math.floor(val) : Math.ceil(val);
  }
};

export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));
  const [addCube] = useStore((state) => [state.addCube]);

  groundTexture.repeat.set(100, 100);

  const handleClick = (e) => {
    e.stopPropagation();
    const point = e.point;
    addCube(roundCoordinate(point.x), 0.5, roundCoordinate(point.z));
  };

  return (
    <mesh onClick={handleClick} ref={ref}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};
