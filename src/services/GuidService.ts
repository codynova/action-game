export class GuidService {

	private static instance: GuidService;

	private constructor () {}

	static getInstance () {
		if (!GuidService.instance) {
			GuidService.instance = new GuidService();
		}

		return GuidService.instance;
	}

	generateGuid (): string {
		// Generates a GUID that is compliant with RFC4122v4
		const placeholder = (([ 1e7 ] as any) + -1e3 + -4e3 + -8e3 + -1e11);
		const guid = placeholder.replace(/[018]/g, (character: number) => {
			const randomNumber = (crypto.getRandomValues(new Uint8Array(1))[0] & 15) >> (character / 4);
			const randomString = (character ^ randomNumber).toString(16);

			return randomString;
		});

		return guid;
	}

}

export default GuidService.getInstance();
