import UserApi from "api/user-api";
import userConfig, { ROLE_ADMIN, ROLE_STAFF } from "constant/user-config";
import defineAbilityFor from "ability/ability";
import DEFINELINK from "routes/define-link";

const userUtils = {
  getToken: async () => {
    try {
      let loginAt = localStorage.getItem(userConfig.LOCAL_STORE_LOGIN_AT);
      if (loginAt) {
        const subTime = subtractDates(loginAt);
        if (
          subTime > userConfig.REQUEST_REFRESH_TIME &&
          subTime < userConfig.STAY_LOGIN_TIME
        ) {
          await refreshToken();
        }
      }
      let accessToken = localStorage.getItem(
        userConfig.LOCAL_STORE_ACCESS_TOKEN
      );

      return `Bearer ${accessToken}`;
    } catch (e) {
      console.log(e);
    }
  },
  refreshToken: async () => {
    let accessToken = await localStorage.getItem(
      userConfig.LOCAL_STORE_ACCESS_TOKEN
    );

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    // fetch("http://192.168.1.9:8080/" + "user/refresh", requestOptions)
    fetch(process.env.REACT_APP_API_URL + "user/refresh", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        saveLocalStorage(userConfig.LOCAL_STORE_ACCESS_TOKEN, result);
        saveLocalStorage(
          userConfig.LOCAL_STORE_LOGIN_AT,
          new Date().toLocaleString()
        );
      })
      .catch((error) => console.log("error refreshToken", error));
  },
  subtractDates: (loginAt) => {
    return (
      Math.abs(new Date() - new Date(loginAt?.replace(/-/g, "/"))) / 1000 / 60
    );
  },
  saveLocalStorage: (name, value) => {
    return localStorage.setItem(name, value);
  },
  getLocalStorage: (name) => {
    return localStorage.getItem(name);
  },
  removeLocalStorage: (name) => {
    return localStorage.removeItem(name);
  },
  fetchRoles: async () => {
    try {
      const response = await UserApi.getRoles();
      return response;
    } catch (error) {
      throw error;
    }
  },
};
export const {
  getToken,
  refreshToken,
  subtractDates,
  saveLocalStorage,
  fetchRoles,
} = userUtils;

export async function updateRoles(ability, history) {
  try {
    const response = await UserApi.getRoles();

    if (response?.includes(ROLE_ADMIN) || response?.includes(ROLE_STAFF)) {
      history.push(DEFINELINK.manager);
    } else {
      history.push(DEFINELINK.store);
    }
    await ability.update(defineAbilityFor(response));
  } catch (error) {
    history.push(DEFINELINK.store);
    throw error;
  }
}

export function logout(ability) {
  ability.update(defineAbilityFor([]));
  localStorage.removeItem(userConfig.LOCAL_STORE_ACCESS_TOKEN);
  localStorage.removeItem(userConfig.LOCAL_STORE_LOGIN_AT);
}
