export class ErrorService {

	private static instance: ErrorService;

	private constructor () {}

	static getInstance () {
		if (!ErrorService.instance) {
			ErrorService.instance = new ErrorService();
		}

		return ErrorService.instance;
	}

	logError (error: Error, info: any) {
		console.error(info, error);
	}

}

export default ErrorService.getInstance();
