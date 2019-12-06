import { Vector2 } from 'Types';

export class VectorService {

	private static instance: VectorService;

	private constructor () {}

	static getInstance () {
		if (!VectorService.instance) {
			VectorService.instance = new VectorService();
		}

		return VectorService.instance;
	}

	add (v1: Vector2, v2: Vector2): Vector2 {
		return [ (v1[0] + v2[0]), (v1[1] + v2[1]) ];
	}

	subtract (v1: Vector2, v2: Vector2): Vector2 {
		return [ (v1[0] - v2[0]), (v1[1] - v2[1]) ];
	}

	getNormal (v: Vector2): number {
		return Math.sqrt((v[0] * v[0]) + (v[1] * v[1]));
	}

	normalize (v: Vector2): Vector2 {
		const normal = this.getNormal(v);

		return [ (v[0] / normal), (v[1] / normal) ];
	}

	getDistance (v1: Vector2, v2: Vector2): number {
		return this.getNormal(this.subtract(v2, v1));
	}

}

export default VectorService.getInstance();
