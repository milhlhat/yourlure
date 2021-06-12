const filterSettings = {
	filterConfig: {
		PAGE_NUMBER_DEFAULT: 0,
		LIMIT_DATA_PER_PAGE: 5,
		PAGE_RANGE_DISPLAYED : 3,
		SORT_OPTIONS: [
			{ display: 'Sản phẩm bán chạy', isAsc: false, sortBy: 'sumQuantity', value: 'SORT_BEST_SELLER' },
			{ display: 'Sản phẩm mới nhất', isAsc: false, sortBy: 'date_create', value: 'SORT_NEWEST_DATE' },
			{ display: 'Sản phẩm cũ nhất', isAsc: true, sortBy: 'date_create', value: 'SORT_OLDEST_DATE' },
			{ display: 'Giá giảm dần', isAsc: false, sortBy: 'default_price', value: 'SORT_LARGEST_PRICE' },
			{ display: 'Giá tăng dần', isAsc: true, sortBy: 'default_price', value: 'SORT_SMALLEST_PRICE' },
		],
	},
};
export const { filterConfig } = filterSettings;
export default filterSettings;
{
	/* isAsc: true: tăng dần
	 *        false: giảm dần
	 *
	 * sort by:
	 * sumQuantity: best seller
	 * date_create : mới nhất
	 * default_price: xếp theo giá */
}
