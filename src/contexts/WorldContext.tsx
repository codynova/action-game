import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import * as CANNON from 'cannon';

export const WorldContext = createContext<CANNON.World>({} as CANNON.World);

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
