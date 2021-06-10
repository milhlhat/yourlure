let Utils = {
	handleChangeInput: (e, state, setState) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	},
	handleChangeCheckbox: (e, state, setState) => {
		let list = [...state];
		for (let i = 0; i < list.length; i++) {
			let item = list[i];
			if (item.categoryID == e.target.name) {
				list[i] = { ...list[i], checked: e.target.checked };
			}
		}
		setState(list);
	},
};
export const { handleChangeInput, handleChangeCheckbox } = Utils;
export default Utils;
