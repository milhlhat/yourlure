import React from "react";

import DEFINELINK from "routes/define-link";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { RenderRoutes } from "../../utils/common";

ProductRoute.propTypes = {};
const Product = React.lazy(() => import("store-front-pages/Product"));
const ProductDetail = React.lazy(() =>
  import("store-front-pages/ProductDetail")
);
const ProductCustomize = React.lazy(() =>
  import("store-front-pages/CustomizeLure")
);
const SearchProduct = React.lazy(() => import("store-front-pages/Search"));
const ShowCustomizes = React.lazy(() =>
  import("store-front-pages/ShowCustomizes")
);
const NotFound = React.lazy(() => import("store-front-pages/Notfound"));

function ProductRoute() {
  const match = useRouteMatch();
  const path = match.path === "/" ? "" : match.path;
  const routes = [
    {
      path: path,
      component: Product,
      exact: true,
      // can: { do: "login", on: "website"},
    },
    { path: path + DEFINELINK.productDetail, component: ProductDetail },
    { path: path + DEFINELINK.productCustomize, component: ProductCustomize },
    {
      path: path + DEFINELINK.productSearch,
      component: SearchProduct,

      // can: { do: "login", on: "website", not: true },
    },
    {
      path: path + DEFINELINK.productShowCustomizes,
      component: ShowCustomizes,
      exact: false,
    },
  ];
  return (
    <Switch>
      {/*<Route exact path={path} component={Product} />*/}
      {/*<Route path={path + DEFINELINK.productDetail} component={ProductDetail} />*/}
      {/*<Route path={path + DEFINELINK.productCustomize} component={ProductCustomize} />*/}
      {/*<Route path={path + DEFINELINK.productSearch} component={SearchProduct} />*/}
      {/*<Route path={path + DEFINELINK.productShowCustomizes} component={ShowCustomizes} />*/}
      <RenderRoutes routes={routes} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default ProductRoute;
