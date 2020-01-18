import React, { useRef, useEffect } from 'react';
import { PerspectiveCamera, Vector3 } from 'three';
import { ReactThreeFiber, extend, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const Camera = (props: ReactThreeFiber.Object3DNode<PerspectiveCamera, typeof PerspectiveCamera>) => {
	const cameraRef = useRef<PerspectiveCamera>();
	const controlsRef = useRef<OrbitControls>();
	const { gl, camera, setDefaultCamera } = useThree();
	useEffect(() => void cameraRef.current ?? setDefaultCamera(cameraRef.current!), []);

	useFrame(() => {
		cameraRef.current?.updateMatrixWorld();
		controlsRef.current?.update();
	});

	return (
		<>
			<perspectiveCamera
				{...props}
				ref={cameraRef}
				position={[ 0, -15, 10 ]}
				up={[ 0, 0, 1 ]}
			/>
			<orbitControls
				autoRotate
				enableDamping
				ref={controlsRef}
				args={[ camera, gl.domElement ]}
				dampingFactor={0.2}
				enablePan={false}
				enableZoom={false}
				rotateSpeed={0.5}
				minPolarAngle={Math.PI / 3}
				maxPolarAngle={Math.PI / 3}
			/>
		</>
	);
};

export { Camera };
