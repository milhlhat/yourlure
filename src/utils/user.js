import UserApi from "api/user-api";
import userConfig, { ROLE_ADMIN, ROLE_STAFF } from "constant/user-config";
import defineAbilityFor from "ability/ability";
import DEFINELINK from "routes/define-link";

const userUtils = {
  getToken: async () => {
    try {
      let accessToken = localStorage.getItem(
        userConfig.LOCAL_STORE_ACCESS_TOKEN
      );
      return `Bearer ${accessToken}`;
    } catch (e) {
      console.log(e);
    }
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

  subtractDates,
  saveLocalStorage,
  fetchRoles,
} = userUtils;

export async function updateRoles(ability, history, backPath = null) {
  try {
    const response = await UserApi.getRoles();

    if (
      (response?.includes(ROLE_ADMIN) || response?.includes(ROLE_STAFF)) &&
      !backPath
    ) {
      history.push(DEFINELINK.manager);
    } else if (!backPath) {
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
