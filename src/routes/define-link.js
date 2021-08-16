const DEFINELINK = {
  //path for store front
  store: "/",
  home: "/home",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  about: "/about",
  campaign: "/campaign",
  viewCustomizeOrder: "/view-customize-order",

  customer: "/customer",
  account: "/account",
  accountEdit: "/account/edit",

  order: "/order",
  address: "/address",
  addressAdd: "/address/add",
  addressEdit: "/address/edit/:id",
  changePassword: "/change-password",

  cart: "/cart",
  payment: "/payment", // /cart/payment

  //product
  product: "/product",
  productDetail: "/detail/:id", // /product/detail/:id
  productCustomize: "/customize", // /product/customize/:id
  productSearch: "/search", // /product/search
  productShowCustomizes: "/show-customizes", // /product/search

  //path for manager page
  manager: "/manager",

  //manager user route
  managementUser: "/user",
  managementUserDetail: "/detail/:id",

  //manager product router
  managementProduct: "/product",
  managerProductAddNew: "/addnew",
  managerProductDetail: "/detail/:id",
  managerProductEdit: "/edit/:id",
  managerVariantAddNew: "/add-variant-by-product-id/:productId",
  managerVariantEdit: "/variant/edit/",
  //manager category route
  managementCategory: "/category",
  managerCategoryAddNew: "/addnew",
  managerCategoryEdit: "/edit/:id",
  managerCategoryDetail: "/detail/:id",

  //manager fish route
  managementFish: "/fish",
  managementFishAddNew: "/addnew",
  managementFishEdit: "/edit/:id",
  managementFishDetail: "/detail/:id",

  //manager order route
  managementOrder: "/order",
  managementOrderDetail: "/detail/:id",
  managementOrderEdit: "/edit/:id",

  //manager staff route
  managementStaff: "/staff",
  managementStaffDetail: "/detail/:id",
  managementStaffAddNew: "/addnew",
  managementStaffEdit: "/edit/:id",

  //manager voucher route
  managementVoucher: "/voucher",
  managementVoucherAddNew: "/addnew",
  managementVoucherEdit: "/edit/:id",
  managementVoucherDetail: "/detail/:id",

  //manager campaign route
  managementCampaign: "/campaign",
  managementCampaignAddNew: "/addnew",
  managementCampaignEdit: "/edit/:id",
  managementCampaignDetail: "/detail/:id",
};
export default DEFINELINK;
