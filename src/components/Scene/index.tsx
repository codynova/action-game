import React from 'react';
import { Canvas } from 'react-three-fiber';
import { AxesHelper } from 'react-three-fiber/components';
import { PhysicsProvider } from 'Contexts';
import { PhysicsBodyWireframes } from 'Debug';
import { Camera, Capsule, Cube, Player, Floor } from 'Components';
import styles from './module.scss';

const Scene = () => {
	return (
		<div className={styles.container}>
			<Canvas shadowMap>
				<ambientLight intensity={0.5} />
				<spotLight
					castShadow
					intensity={0.8}
					position={[ 0, 0, 15 ]}
					angle={0.3}
					penumbra={1}
				/>
				<AxesHelper args={[ 15 ]} />
				<Camera />
				<PhysicsProvider>
					<PhysicsBodyWireframes />
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
					<Capsule position={[ -2, -3, 3 ]} />
					<Capsule position={[ 0, 1, 4 ]} />
					<Capsule position={[ -4, -1, 2 ]} />
					<Capsule position={[ 4, 0, 1 ]} />
					<Capsule position={[ 3, 2, 4 ]} />
					<Player position={[ 2, 2, 2 ]} />
					<Floor />
				</PhysicsProvider>
			</Canvas>
		</div>
	);
};

export { Scene };
