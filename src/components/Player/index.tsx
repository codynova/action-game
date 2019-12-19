import React from 'react';
import { Vector3 } from 'Types';
import { PlayerBody } from 'Components';

const Player = ({
	position = [ 0, 0, 0 ],
}: {
	position: Vector3;
}) => {
	return (
		<PlayerBody
			position={position}
			color="blue"
		/>
	);
};

export { Player };
