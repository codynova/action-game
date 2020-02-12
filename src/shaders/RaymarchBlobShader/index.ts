import { Shader } from 'three';
import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

const hexColorToRGB = (hex: number) => {
	hex = Math.floor(hex);
	const r = ((hex >> 16) & 255) / 255;
	const g = ((hex >> 8) & 255) / 255;
	const b = (hex & 255) / 255;

	return [ r, g, b ];
};

const RaymarchBlobShader: Shader = {
	uniforms: {
		time: { value: 0.0 },
		resolution: { value: [ 0, 0 ] },
		blobs: {
			value: [
				{
					color: hexColorToRGB(0xffb6b9),
					pos: [ 1.0, 1.0, 1.0 ],
					speed: 0.8,
				},
				{
					color: hexColorToRGB(0xfae3d9),
					pos: [ 1.0, -0.5, -1.0 ],
					speed: 0.6,
				},
				{
					color: hexColorToRGB(0xbbded6),
					pos: [ -0.8, 1.0, -0.5 ],
					speed: 1.0,
				},
				{
					color: hexColorToRGB(0x8ac6d1),
					pos: [ -0.4, -1.0, 0.5 ],
					speed: 0.7,
				},
				{
					color: hexColorToRGB(0xfffcab),
					pos: [ -0.5, 0.7, 1.0 ],
					speed: 0.5,
				},
			],
		},
	},
	vertexShader,
	fragmentShader,
};

export { RaymarchBlobShader };
