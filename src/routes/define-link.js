const Home = '/home';
const Product = '/product';
const Cart = '/cart';
const User = '/user';

const Payment = '/cart/payment';
const ProductDetail = '/product/detail/:id';
const ProductCustomize = '/product/customize/:id';
const ProductSearch = '/product/search';

const Account = '/user/account';
const manager = '/manager';
const store = '/';

const DEFINELINK = {
	home: Home,
	user: User,
	product: Product,
	cart: Cart,
	about: '/about',
	campaign: '/campaign',
	payment: Payment,
	productDetail: ProductDetail,
	productCustomize: ProductCustomize,
	productSearch: ProductSearch,
	login: '/login',
	register: '/register',
	forgotPassword: '/fogot-password',
	account: Account,

	manager: manager,
	store: store,
};
export default DEFINELINK;
