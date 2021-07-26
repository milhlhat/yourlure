import React from "react";
import { Route } from "react-router-dom";
import NoPermistion from "components/error-notify/NoPermistion";
import { Can } from "ability/can";

const CommonUtils = {
  scrollTop: () => {
    window.scrollTo(0, 0);
  },
  parseString2Boolean: (value) => {
    if (String(value).toLowerCase() === "false") {
      return false;
    } else {
      return true;
    }
  },
};
export const { parseString2Boolean } = CommonUtils;
export default CommonUtils;

export function RenderRoutes({ routes, properties }) {
  return (
    <React.Fragment>
      {routes.map((item, index) => (
        <Can
          not={item.can?.not ? item.can?.not : false}
          do={item.can?.do ? item.can?.do : "buy"}
          on={item.can?.on ? item.can?.on : "product"}
          key={item.path + index}
          passThrough
        >
          {(allowed) => (
            <Route exact={item.exact} key={item.path + index} path={item.path}>
              {allowed ? (
                <item.component properties={properties} />
              ) : (
                <NoPermistion hasLayout />
              )}
            </Route>
          )}
        </Can>
      ))}
    </React.Fragment>
  );
}
/**
 * utils to remove all XSS  attacks potential
 * @param {String} html
 * @return {Object}
 */
export const safeContent = (html) => {
  const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

  //Removing the <script> tags
  while (SCRIPT_REGEX.test(html)) {
    html = html.replace(SCRIPT_REGEX, "");
  }

  //Removing all events from tags...
  html = html.replace(/ on\w+="[^"]*"/g, "");

  return {
    __html: html,
  };
};
