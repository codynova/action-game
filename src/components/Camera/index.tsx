import React, { useRef, useEffect } from 'react';
import { PerspectiveCamera } from 'three';
import { ReactThreeFiber, useThree, useFrame } from 'react-three-fiber';

const Camera = (props: ReactThreeFiber.Object3DNode<PerspectiveCamera, typeof PerspectiveCamera>) => {
	const cameraRef = useRef<PerspectiveCamera>({} as PerspectiveCamera);
	const { setDefaultCamera } = useThree();
	useEffect(() => void setDefaultCamera(cameraRef.current), []);
	useFrame(() => cameraRef.current.updateMatrixWorld());

	return (
		<perspectiveCamera
			{...props}
			ref={cameraRef}
		/>
	);
};

export { Camera };
