import React from 'react';
import { useThree } from 'react-three-fiber';

const Mirror = () => {
	const { size: { width, height } } = useThree();

	return (
		<reflector
			position={[ 0, 10, 0 ]}
			rotation={[ Math.PI / 2, 0, 0 ]}
			args={[
				undefined,
				{
					clipBias: 0.003,
					textureWidth: width,
					textureHeight: height,
					recursion: 1,
				},
			]}
		>
			<planeBufferGeometry
				attach="geometry"
				args={[ 40, 40 ]}
			/>
		</reflector>
	);
};

export { Mirror };
