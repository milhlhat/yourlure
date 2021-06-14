let Utils = {
	handleChangeInput: (e, state, setState) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	},
	handleChangeCheckbox: (e, state, setState) => {
		let list = JSON.parse(JSON.stringify(state));
		if (list.length > 0)
			for (let i = 0; i < list.length; i++) {
				let item = list[i];
				if (item.categoryID == e.target.name || item.fishID == e.target.name) {
					list[i] = { ...list[i], checked: e.target.checked };
				}
			}
		setState(list);
	},
	handleCheckAllCateOrFish: (e, state, setState) => {
		let list = [...state];
		if (list.length > 0)
			for (let i = 0; i < list.length; i++) {
				list[i] = { ...list[i], checked: e.target.checked };
			}
		setState(list);
	},
	getIsCheckedAll: (list) => {
		if (list.length > 0) {
			for (let i = 0; i < list.length; i++) {
				if (!list[i].checked) return false;
			}

			return true;
		} else {
			return false;
		}
	},
};
export const { handleChangeInput, handleChangeCheckbox,
	 handleCheckAllCateOrFish,getIsCheckedAll } = Utils;
export default Utils;
