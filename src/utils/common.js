import React from "react";
import {Route} from "react-router-dom";
import NoPermistion from "components/error-notify/NoPermistion";
import {Can} from "ability/can";

const CommonUtils = {
    scrollTop: () => {
        window.scrollTo(0, 0);
    }
};
export default CommonUtils;

export function RenderRoutes({routes}) {
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
                                    <item.component {...props} />
                                ) : (
                                    <NoPermistion hasLayout/>
                                )
                            }
                        />
                    )}
                </Can>
            ))}
        </React.Fragment>
    );
}
