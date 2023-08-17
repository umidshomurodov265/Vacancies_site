import API from "@/API/api";

//  works
export const WorksService = {
  GetList(filter) {
    let url = "adm/works";
    return API.post(url, filter);
  },
  GetModel() {
    let url = `adm/works/create/get`;
    return API.get(url);
  },
  GetById(id) {
    let url = `adm/works/${id}`;
    return API.get(url);
  },
  Add(items) {
    let url = "adm/works/add";
    return API.post(url, items);
  },
  Update(items, id) {
    let url = `adm/works/${id}`;
    return API.put(url, items);
  },
  Delete(id) {
    let url = `adm/works/${id}`;
    return API.delete(url);
  },

  // LimitAndSkipProducts(filter) {
  //   let url = `products?limit=${filter.limit}&skip=${filter.skip}&brand=${filter.brand}`;
  //   return api.get(url);
  // },
  SearchWorks(search) {
    let url = `adm/works/search?q=${search}`;
    return API.get(url);
  },
};
//
