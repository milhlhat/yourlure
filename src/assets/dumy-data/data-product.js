const dumyProduct = {
	products: () => {
		return [
			{productID: 1, productName: 'TÔM GIẢ CÂU MỰC TM03', categoryId: '1', brand: 'null', defaultPrice: 50000 },
			{productID: 2, productName: 'TÔM GIẢ CÂU MỰC TM08', categoryId: '1', brand: 'null', defaultPrice: 50000 },
			{productID: 3, productName: 'TÔM GIẢ CÂU MỰC CÓ ĐÈN TM05', categoryId: '1', brand: 'null', defaultPrice: 50000 },
			{productID: 4, productName: 'MỒI CÂU LURE CHẼM, HỒNG, MÚ M80', categoryId: '2', brand: 'null', defaultPrice: 50000 },
			{productID: 5, productName: 'MỒI LURE BIỂN CR28', categoryId: '2', brand: 'null', defaultPrice: 50000 },
			{productID: 6, productName: 'CÁ SẮT JD06 CÂU CÁ LÓC', categoryId: '2', brand: 'null', defaultPrice: 50000 },
			{productID: 7, productName: 'MỒI CÂU LURE BIỂN SLURE 120', categoryId: '2', brand: 'null', defaultPrice: 50000 },
			{productID: 8, productName: 'MỒI CÂU LURE BIỂN X ROOL 128', categoryId: '2', brand: 'null', defaultPrice: 50000 },
			{productID: 9, productName: 'cá rô', categoryId: '2', brand: 'null', defaultPrice: 50000 },
			{productID: 10, productName: 'cá rô', categoryId: '2', brand: 'null', defaultPrice: 50000 },
			{productID: 11, productName: 'cá rô', categoryId: '3', brand: 'null', defaultPrice: 50000 },
			{productID: 12, productName: 'cá rô', categoryId: '3', brand: 'null', defaultPrice: 50000 },
			{productID: 13, productName: 'cá rô', categoryId: '3', brand: 'null', defaultPrice: 50000 },
			{productID: 14, productName: 'cá rô', categoryId: '3', brand: 'null', defaultPrice: 50000 },
		];
	},
	category: () => {
		return [
			{ categoryID: 1, categoryName: 'Mồi câu mực', checked: true },
			{ categoryID: 2, categoryName: 'Mồi cứng', checked: true },
			{ categoryID: 3, categoryName: 'Mồi mềm', checked: false },
		];
	},
	fish: () => {
		return [
			{ fishID: 1, fishName: 'Cá chép', checked: true },
			{ fishID: 21, fishName: 'Cá chuối', checked: true },
			{ fishID: 3, fishName: 'Cá rô', checked: false },
			{ fishID: 4, fishName: 'Cá chim', checked: false },
		];
	},
	cart: () => {
		return [
			{
				id: 1,
				name: 'Cá chép',
				price: '50000',
				color: 'blue',
				quantity: 2,
				weight: 16,
				img: 'https://docautuankiet.com/uploads/products/05022020033936/moi-gia-orochi_05022020033936.jpg',
				checked: true,
			},
			{
				id: 2,
				name: 'Cá chuối',
				price: '50000',
				color: 'blue',
				quantity: 1,
				weight: 17,
				img: 'https://docautuankiet.com/uploads/products/05022020033936/moi-gia-orochi_05022020033936.jpg',
				checked: true,
			},
			{
				id: 3,
				name: 'Cá rô',
				price: '50000',
				color: 'blue',
				quantity: 6,
				weight: 18,
				img: 'https://docautuankiet.com/uploads/products/05022020033936/moi-gia-orochi_05022020033936.jpg',
				checked: true,
			},
		];
	},
};
export default dumyProduct;
