import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUser(user) {
  return Cookies.set('CurrentUser', user)
}

export function getUser() {
  return Cookies.get('CurrentUser')
}

export function removeUser() {
  return Cookies.remove('CurrentUser')
}
