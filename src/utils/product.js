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
		let id = 0;
		for (const i in list) {
			const element = list[i];
			if (element.type === type) {
				listTemp.push({
					id: id,
					name: element.name,
					img: '',
					color: '',
					text: '',
					canAddText: false,
					canAddImg: true,
					canAddColor: true,
				});
				id++;
			}
		}
		return listTemp;
	},
	getColorMaterialByName: (listmaterial, name) => {
		if (listmaterial.length > 0) {
			for (const i in listmaterial) {
				const element = listmaterial[i];
				if (element.name === name) return element.color;
			}
		}
		return '';
	},
};
export const { getNodesInfoBy, getMaterialsInfoBy, getMaterialsName, getColorMaterialByName } = productUtils;
export default productUtils;
