import api from "@/helpers/api";

export const AuthService = {
  GetToken(data) {
    let url = "auth/login";
    return api.post(url, data);
  },
};
