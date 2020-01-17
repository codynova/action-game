import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Vector3 } from 'Types';
import { PlayerBody, PlayerControls } from 'Components';
import * as CANNON from 'cannon';

// https://github.com/codynova/softworld-unity/tree/master/Assets/Scripts/Player
// https://github.com/swift502/Sketchbook/blob/master/src/sketchbook/characters/Character.ts

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
		const playerBody = playerBodyRef.current;

		if (!playerBody) {
			return;
		}

		if (isMovingForwardRef.current) {
			playerBody.velocity.y += 1;
		}

		if (isMovingLeftRef.current) {
			playerBody.velocity.x -= 1;
		}

		if (isMovingBackwardRef.current) {
			playerBody.velocity.y -= 1;
		}

		if (isMovingRightRef.current) {
			playerBody.velocity.x += 1;
		}

		if (isJumpingRef.current) {
			playerBody.velocity.z += 1;
		}
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
