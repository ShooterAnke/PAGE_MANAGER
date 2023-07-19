import store from "@/store";

export function getTOken() {
  return store.dispatch("getToken");
}

export function setToken(token) {
  return store.dispatch("setToken", token);
}
export function removeToken() {
  return store.dispatch("removeToken");
}