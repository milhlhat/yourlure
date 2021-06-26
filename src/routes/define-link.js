const DEFINELINK = {
	//path for store front
	store: '/',
	home: '/home',
	login: '/login',
	register: '/register',
	forgotPassword: '/fogot-password',
	about: '/about',
	campaign: '/campaign',

	customer: '/customer',
	account: '/account',
	order: '/order',
	address: '/address',
	addressAdd: '/address/add',
	addressEdit: '/address/edit/:id',

	cart: '/cart',
	payment: '/payment', // /cart/payment

	product: '/product',
	productDetail: '/detail/:id', // /product/detail/:id
	productCustomize: '/customize/:id', // /product/customize/:id
	productSearch: '/search', // /product/search

	//path for manager page
	manager: '/manager',
	
	//manager user route
	managementUser:'/user',
	
	//manager product router	
	managementProduct:'/product',
	managerProductAddNew:'/addnew'

};
export default DEFINELINK;
