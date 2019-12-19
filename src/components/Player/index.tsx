import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Vector3 } from 'Types';
import { PlayerBody, PlayerControls } from 'Components';
import * as CANNON from 'cannon';

const Player = ({
	position = [ 0, 0, 0 ],
}: {
	position: Vector3;
}) => {
	const playerBodyRef = useRef<CANNON.Body>(null);
	const isMovingForwardRef = useRef(false);
	const isMovingLeftRef = useRef(false);
	const isMovingBackwardRef = useRef(false);
	const isMovingRightRef = useRef(false);
	const isJumpingRef = useRef(false);

	useFrame(() => {
		if (!playerBodyRef.current) {
			return;
		}

		const force = new CANNON.Vec3(0, 0, 0);
		const worldPoint = new CANNON.Vec3(0, 0, 0);

		if (isMovingForwardRef.current) {
			force.y = -450 * (1 / 60);
		}

		if (isMovingLeftRef.current) {
			force.x = 350 * (1 / 60);
		}

		if (isMovingBackwardRef.current) {
			force.y = 450 * (1 / 60);
		}

		if (isMovingRightRef.current) {
			force.x = -350 * (1 / 60);
		}

		if (isJumpingRef.current) {
			force.z = 350 * (1 / 60);
		}

		// playerBodyRef.current.applyForce(force, worldPoint);
		playerBodyRef.current.applyImpulse(force, worldPoint);
	});

	return (
		<>
			<PlayerBody
				position={position}
				color="blue"
				physicsBodyRef={playerBodyRef}
			/>
			<PlayerControls
				isMovingForwardRef={isMovingForwardRef}
				isMovingLeftRef={isMovingLeftRef}
				isMovingBackwardRef={isMovingBackwardRef}
				isMovingRightRef={isMovingRightRef}
				isJumpingRef={isJumpingRef}
			/>
		</>
	);
};

export { Player };
