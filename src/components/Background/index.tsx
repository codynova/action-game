import React from 'react';

const Background = () => {
	return (
		<mesh>
			<planeBufferGeometry
				attach="geometry"
				args={[ 30, 30 ]}
			/>
			<meshBasicMaterial
				attach="material"
				color="teal"
			/>
		</mesh>
	);
};

export { Background };
