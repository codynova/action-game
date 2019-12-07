import React, { useRef, useEffect } from 'react';
import { ReactThreeFiber, useThree, useFrame, useRender, useUpdate, Canvas, extend } from 'react-three-fiber';
import { PerspectiveCamera } from 'three';
import { useCannon, PhysicsProvider } from 'Hooks';
import { Vector2, Vector3 } from 'Types';
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
	size,
}: {
	position: Vector3;
	size: Vector2;
}) => {
	const floorRef = useCannon({ mass: 0 }, body => {
		body.addShape(new CANNON.Plane());
		body.position.set(...position);
	});
	return (
		<mesh
			receiveShadow
			ref={floorRef}
		>
			<planeBufferGeometry
				attach="geometry"
				args={size}
			/>
			<meshPhongMaterial
				attach="material"
				color="#272727"
			/>
		</mesh>
	);
};

const Capsule = ({
	position,
	size,
}: {
	position: Vector3;
	size: Vector3;
}) => {
	const capsuleRef = useCannon()
};

const Item = ({
	position,
	size,
}: {
	position: Vector3;
	size: Vector3;
}) => {
	const itemRef = useCannon({ mass: 1000 }, body => {
		body.addShape(new CANNON.Box(new CANNON.Vec3(...size.map(component => component * 0.5))));
		body.position.set(...position);
	});
	return (
		<mesh
			castShadow
			receiveShadow
			ref={itemRef}
		>
			<boxGeometry
				attach="geometry"
				args={size}
			/>
			<meshStandardMaterial attach="material" />
		</mesh>
	);
};

const Test = () => {
	return (
		<div style={{ background: 'grey', width: '100%', height: '100%' }}>
			<Canvas shadowMap>
				<ambientLight intensity={0.5} />
				<spotLight
					castShadow
					intensity={0.8}
					position={[ 0, 0, 15 ]}
					angle={0.3}
					penumbra={1}
				/>
				<Camera
					position={[ 0, -15, 10 ]}
					rotation={[ 1, 0, 0 ]}
				/>
				<PhysicsProvider>
					<Item
						position={[ -0.5, -0.5, 1 ]}
						size={[ 1, 2, 1 ]}
					/>
					<Item
						position={[ 0, 0, 5 ]}
						size={[ 2, 1, 1 ]}
					/>
					<Item
						position={[ 0.5, 0.5, 7 ]}
						size={[ 1, 1, 2 ]}
					/>
					<Floor
						position={[ 0, 0, 0 ]}
						size={[ 10, 10 ]}
					/>
				</PhysicsProvider>
			</Canvas>
		</div>
	);
};

export { Test };
