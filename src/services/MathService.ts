export class MathService {

	private static instance: MathService;

	private constructor () {}

	static getInstance () {
		if (!MathService.instance) {
			MathService.instance = new MathService();
		}

		return MathService.instance;
	}

	clamp (number: number, minimum: number, maximum: number): number {
		return Math.max(Math.min(number, maximum), minimum);
	}

}

export default MathService.getInstance();
