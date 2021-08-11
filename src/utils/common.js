import React from "react";
import { Route } from "react-router-dom";
import NoPermistion from "components/error-notify/NoPermistion";
import { Can } from "authorization/can";
import { toast } from "react-toastify";

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

  copyToClipboard: (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast.success("Sao chép thành công");
  },
};
export const { parseString2Boolean, copyToClipboard, scrollTop } = CommonUtils;
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
            <Route
              exact={item.exact}
              key={item.path + index}
              path={item.path}
              render={(props) =>
                allowed ? (
                  <item.component properties={properties} {...props} />
                ) : (
                  <NoPermistion hasLayout />
                )
              }
            />
          )}
        </Can>
      ))}
    </React.Fragment>
  );
}

/**
* utils to remove all XSS  attacks potential
* @param
{
    String
}
html
* @return
{
    Object
}
*/
export const safeContent = (html) => {
  if(!html) return html
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
