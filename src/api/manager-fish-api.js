import { filterConfig } from 'constant/filter-setting';
import AxiosClient from './axios-client';

const ManagerFishAPI = {

  getAll: () => {
    const filter = {
      isAsc: true,
      keyword: "",
      limit: filterConfig.LIMIT_DATA_PER_PAGE,
      listCateId: [

      ],
      listFishId: [

      ],
      page: filterConfig.PAGE_NUMBER_DEFAULT,
      sortBy: "fishId"
    }
    const url = '/admin/fish/searchAll';
    return AxiosClient.post(url, filter);
  },
  delete: (param) => {
    const url = `/admin/fish/delete/${param}`;
    return AxiosClient.delete(url);
  },
  add: (param) => {
    const url = '/admin/fish/save';
    return AxiosClient.post(url, param);
  },
  update: (id) => {
    const url = `/admin/fish/u/${id}`;
    return AxiosClient.post(url);
  },
};
export const { getAll } = ManagerFishAPI;
export default ManagerFishAPI;
