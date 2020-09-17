import { setItem, getItem, removeItem } from './storage'

export function setToken(token) {
  setItem("token", token, "session");
}

export function getToken() {
  return getItem("token", "session");
}

export function getLocalToken() {
  return getItem("token");
}

export function clearToken() {
  removeItem("token", "session");
}

export function getTokenHeaders () {
  return {
    Authorization: `Bearer ${getToken() || ""}`
  }
}