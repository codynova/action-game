export class ArrayService {

	private static instance: ArrayService;

	private constructor () {}

	static getInstance () {
		if (!ArrayService.instance) {
			ArrayService.instance = new ArrayService();
		}

		return ArrayService.instance;
	}

	swapItems (array: any[], targetItemIndex: number, moveToIndex: number): any[] {
		const newArray = array.slice(0);
		const targetItem = newArray[targetItemIndex];
		newArray.splice(targetItemIndex, 1);
		newArray.splice(moveToIndex, 0, targetItem);

		return newArray;
	}

	removeItem (array: any[], targetItemIndex: number): any[] {
		if (targetItemIndex !== -1) {
			const newArray = array.slice(0);
			newArray.splice(targetItemIndex, 1);

			return newArray;
		}

		return array;
	}

}

export default ArrayService.getInstance();
