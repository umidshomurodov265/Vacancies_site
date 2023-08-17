import api from "@/helpers/api";

//  products
export const ProductsService = {
  GetList() {
    let url = "products";
    return api.get(url);
  },
  Get(id) {
    let url = `products/${id}`;
    return api.get(url, id);
  },
  Add(items) {
    let url = "products/add";
    return api.post(url, items);
  },
  Update(items, id) {
    let url = `products/${id}`;
    return api.put(url, items);
  },
  Delete(id) {
    let url = `products/${id}`;
    return api.delete(url);
  },
  GetCategoriesList(ext) {
    let url = "products/categories";
    return api.get(url);
  },
  GetProductsOfCategory(category) {
    let url = `products/category/${category}`;
    return api.get(url);
  },

  LimitAndSkipProducts(filter) {
    let url = `products?limit=${filter.limit}&skip=${filter.skip}&brand=${filter.brand}`;
    return api.get(url);
  },
  SearchProducts(search) {
    let url = `products/search?q=${search}`;
    return api.get(url);
  },
};
//
