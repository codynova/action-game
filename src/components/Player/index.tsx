import React from 'react';
import { Capsule } from 'Components';
import { Vector3 } from 'Types';

const Player = ({
	position = [ 0, 0, 0 ],
}: {
	position: Vector3;
}) => {
	return (
		<Capsule
			position={position}
			color="blue"
			cannonCallback={body => void (body.angularDamping = 1)}
		/>
	);
};

export { Player };
