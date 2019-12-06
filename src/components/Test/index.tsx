import React, { useRef, useEffect } from 'react';
import { ReactThreeFiber, useThree, useFrame, useRender, useUpdate, Canvas, extend } from 'react-three-fiber';
import { PerspectiveCamera } from 'three';
import { useCannon, PhysicsProvider } from 'Hooks';
import { Vector3 } from 'Types';
import * as CANNON from 'cannon';

const Camera = (props: ReactThreeFiber.Object3DNode<PerspectiveCamera, typeof PerspectiveCamera>) => {
	const cameraRef = useRef<PerspectiveCamera>({} as PerspectiveCamera);
	const { setDefaultCamera } = useThree();

	useEffect(() => {
		setDefaultCamera(cameraRef.current);
	}, []);

	useFrame(() => cameraRef.current.updateMatrixWorld());
	return (
		<perspectiveCamera
			{...props}
			ref={cameraRef}
		/>
	);
};

const Floor = ({
	position,
}: {
    position: Vector3;
}) => {
	const floorRef = useCannon({ mass: 0 }, body => {
		body.addShape(new CANNON.Plane());
		body.position.set(...position);
	});
	return (
		<mesh ref={floorRef}>
			<planeBufferGeometry
				attach="geometry"
				args={position}
			/>
			<meshNormalMaterial attach="material" />
		</mesh>
	);
};

const Test = () => {
	return (
		<div style={{ background: 'grey', width: '100%', height: '100%' }}>
			<Canvas>
				<Camera
					// position={[ 0, -15, 10 ]}
                    // rotation={[ 1, 0, 0 ]}
					position={[ 0, -15, 10 ]}
					rotation={[ 1, 0, 0 ]}
				/>
				<Floor position={[ 10, 10, 0 ]} />
			</Canvas>
		</div>
	);
};

export { Test };
