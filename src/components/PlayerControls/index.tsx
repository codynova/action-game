import React, { useEffect } from 'react';
import { EPlayerControls } from 'Types';

const PlayerControls = ({
	isMovingForwardRef,
	isMovingLeftRef,
	isMovingBackwardRef,
	isMovingRightRef,
	isJumpingRef,
}: {
	isMovingForwardRef: React.MutableRefObject<boolean>;
	isMovingLeftRef: React.MutableRefObject<boolean>;
	isMovingBackwardRef: React.MutableRefObject<boolean>;
	isMovingRightRef: React.MutableRefObject<boolean>;
	isJumpingRef: React.MutableRefObject<boolean>;
}) => {
	useEffect(() => {
		const onKeyDown = ({ keyCode }: KeyboardEvent) => {
			switch (keyCode) {
				case EPlayerControls.Forward:
					isMovingForwardRef.current = true;
					break;
				case EPlayerControls.Left:
					isMovingLeftRef.current = true;
					break;
				case EPlayerControls.Backward:
					isMovingBackwardRef.current = true;
					break;
				case EPlayerControls.Right:
					isMovingRightRef.current = true;
					break;
				case EPlayerControls.Jump:
					isJumpingRef.current = true;
					break;
				default:
					break;
			}
		};

		const onKeyUp = ({ keyCode }: KeyboardEvent) => {
			switch (keyCode) {
				case EPlayerControls.Forward:
					isMovingForwardRef.current = false;
					break;
				case EPlayerControls.Left:
					isMovingLeftRef.current = false;
					break;
				case EPlayerControls.Backward:
					isMovingBackwardRef.current = false;
					break;
				case EPlayerControls.Right:
					isMovingRightRef.current = false;
					break;
				case EPlayerControls.Jump:
					isJumpingRef.current = false;
					break;
				default:
					break;
			}
		};

		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp);
		};
	});

	return null;
};

export { PlayerControls };
