export class SearchService {

	private static instance: SearchService;

	private constructor () {}

	static getInstance () {
		if (!SearchService.instance) {
			SearchService.instance = new SearchService();
		}

		return SearchService.instance;
	}

	searchByString (data: object[], searchString: string): any[] {
		const key = searchString.toLowerCase();
		const result = [];
		const dataLength = data.length;

		for (let i = 0; i < dataLength; i++) {
			const item = data[i];
			const values = Object.values(item);
			const valuesLength = values.length;

			for (let j = 0; j < valuesLength; j++) {
				if (values[j].toLowerCase().includes(key)) {
					result.push(item);
					break;
				}
			}
		}

		return result;
	}

	searchByStringInProperty (data: { [key: string]: any }[], searchString: string, propertyName: string): any[] {
		const key = searchString.toLowerCase();
		const result = [];
		const dataLength = data.length;

		for (let i = 0; i < dataLength; i++) {
			const item = data[i];
			const value = item[propertyName];

			if (value && value.toLowerCase().includes(key)) {
				result.push(item);
			}
		}

		return result;
	}

}

export default SearchService.getInstance();
