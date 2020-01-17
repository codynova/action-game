import React, { useRef, useEffect } from 'react';
import { PerspectiveCamera } from 'three';
import { ReactThreeFiber, extend, useThree, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
		}
	}
}

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
			/>
			<orbitControls
				ref={controlsRef}
				args={[ camera, gl.domElement ]}
			/>
		</>
	);
};

export { Camera };
