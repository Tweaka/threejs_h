import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Physics, useBox, usePlane } from "@react-three/cannon";

//geometry + material
function Box(props) {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
  return (
    <mesh
      //onclick move the box on the x axis
      onClick={() => {
        api.velocity.set(0, 2, 0);
      }}
      ref={ref}
      position={[0, 2, 0]}
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="purple" />
    </mesh>
  );
}

//plane set to horizontal plane
function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}

export default function Main() {
  return (
    <div>
      {/* canvas tag to handle 3D environment */}
      <Canvas>
        {/* orbicontrols from drei to handle camera controls */}
        <OrbitControls />
        {/* starry sky */}
        <Stars />
        {/* lights are here */}
        <ambientLight intensity={0.5} />
        {/* add lights with position to get perspective */}
        <pointLight position={[10, 15, 10]} anglet={0.3} />

        {/* wrap components that need physics */}
        <Physics>
          <Box />
          <Plane />
        </Physics>
      </Canvas>
    </div>
  );
}
