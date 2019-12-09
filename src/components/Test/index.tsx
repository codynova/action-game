import React from 'react';
import { Canvas } from 'react-three-fiber';
import { PhysicsProvider } from 'Contexts';
import { PhysicsDebugger } from 'Debug';
import { Camera, Capsule, Cube, Player, Floor } from 'Components';

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
					<PhysicsDebugger />
					<Cube
						position={[ -0.5, -0.5, 1 ]}
						height={2}
					/>
					<Cube
						position={[ 0, 0, 5 ]}
						width={2}
					/>
					<Cube
						position={[ 0.5, 0.5, 7 ]}
						depth={2}
					/>
					<Capsule position={[ 2, 1, 4 ]} />
					<Capsule position={[ 0, 1, 4 ]} />
					<Player position={[ 2, 1, 4 ]} />
					<Floor />
				</PhysicsProvider>
			</Canvas>
		</div>
	);
};

export { Test };
