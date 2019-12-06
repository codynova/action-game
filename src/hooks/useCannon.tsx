import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Vector3, Quaternion } from 'three';
import * as CANNON from 'cannon';

const WorldContext = createContext<CANNON.World>({} as CANNON.World);

export const PhysicsProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [ world ] = useState(() => new CANNON.World());

	useEffect(() => {
		world.broadphase = new CANNON.NaiveBroadphase();
		world.solver.iterations = 10;
		world.gravity.set(0, 0, -25);
	}, [ world ]);

	// Run world stepper every frame
	useFrame(() => world.step(1 / 60));

	return (
		<WorldContext.Provider value={world}>
			{children}
		</WorldContext.Provider>
	);
};

export const useCannon = <T extends THREE.Object3D>({ ...props }, fn: (body: CANNON.Body) => void, deps = []) => {
	const ref = useRef<T>();
	const world = useContext(WorldContext);
	const [ body ] = useState(() => new CANNON.Body(props));

	useEffect(() => {
		// Call function so the user can add shapes, positions, etc. to the body
		fn(body);
		world.addBody(body);
		return () => world.remove(body);
	}, deps);

	useFrame(() => {
		if (ref.current) {
			// Transport cannon physics into the referenced threejs object
			const { position, quaternion } = body;
			const { x: px, y: py, z: pz } = position;
			const { x: qx, y: qy, z: qz, w: qw } = quaternion;
			ref.current.position.copy(new Vector3(px, py, pz));
			ref.current.quaternion.copy(new Quaternion(qx, qy, qz, qw));
		}
	});

	return ref;
};
