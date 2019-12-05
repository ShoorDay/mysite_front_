export function jwt(jwt) {
  return JSON.parse(decodeURIComponent(escape(window.atob(jwt.split(".")[1]))));
}

export function isExpired(time) {
  let date = new Date();
  if (date.getTime() > time * 1000) return true;
  else return false;
}
