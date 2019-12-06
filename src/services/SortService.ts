export class SortService {

	private static instance: SortService;

	private constructor () {}

	static getInstance () {
		if (!SortService.instance) {
			SortService.instance = new SortService();
		}

		return SortService.instance;
	}

	sortByProperty (propertyName: string) {
		let sortOrder = 1;

		if (propertyName[0] === '-') {
			sortOrder = -1;
			propertyName = propertyName.substr(1);
		}

		return function (x: {[key: string]: any}, y: {[key: string]: any}) {
			const xProperty = x[propertyName];
			const yProperty = y[propertyName];
			const result = xProperty < yProperty ? -1 : xProperty > yProperty ? 1 : 0;

			return result * sortOrder;
		};
	}

	sortByProperties () {
		const properties = arguments;

		return (x: object, y: object) => {
			let i = 0;
			let result = 0;
			const numberOfProperties = properties.length;

			while (result === 0 && i < numberOfProperties) {
				result = this.sortByProperty(properties[i])(x, y);
				i++;
			}

			return result;
		};
	}

}

export default SortService.getInstance();
