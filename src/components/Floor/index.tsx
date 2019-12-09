import React from 'react';
import { useCannon } from 'Hooks';
import { Vector3 } from 'Types';
import * as CANNON from 'cannon';

const Floor = ({
	position = [ 0, 0, 0 ],
	width = 10,
	height = 10,
	depth = 1.5,
	color = '#272727',
}: {
	position?: Vector3;
	width?: number;
	height?: number;
	depth?: number;
	color?: string;
}) => {
	const floorRef = useCannon({ mass: 0 }, body => {
		body.addShape(new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5)));
		body.position.set(...position);
	});

	return (
		<mesh
			receiveShadow
			ref={floorRef}
		>
			<boxBufferGeometry
				attach="geometry"
				args={[ width, height, depth ]}
			/>
			<meshPhongMaterial
				attach="material"
				color={color}
			/>
		</mesh>
	);
};

export { Floor };
