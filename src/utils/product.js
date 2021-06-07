let productUtils = {
	getNodesInfoBy: (list, type) => {
		let listTemp = [];
		for (const i in list) {
			const element = list[i];
			if (element.type === type) {
				listTemp.push({ name: element.name, geometry: element.geometry });
			}
		}
		return listTemp;
	},
	getMaterialsInfoBy: (list, type) => {
		let listTemp = [];
		for (const i in list) {
			const element = list[i];
			if (element.type === type) {
				listTemp.push({ name: element.name, mesh: element });
			}
		}
		return listTemp;
	},
	getMaterialsName: (list, type) => {
		let listTemp = [];
		for (const i in list) {
			const element = list[i];
			if (element.type === type) {
				listTemp.push({id: i, name: element.name, img: '', color: '', text: '', canAddText: false });
			}
		}
		return listTemp;
	},
};
export const { getNodesInfoBy, getMaterialsInfoBy, getMaterialsName } = productUtils;
export default productUtils;
